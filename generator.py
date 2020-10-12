# %%
from random import choice
import re

LENGTH = 5
FORBIDDEN = "ç ̃ ́"
ALLOWED = """eaonirsldtcumpg,b.yvóf"h1qí0E2CzjáAS59éLkM/P=38wBñTD)(4R76xFIG:><úN-HJVUO?KW;»«XYZ' Q%Á”“—º][–ü&É"""

ALLOWED2 = """eaonirsldtcumpgbyvfhqzjkñwx ,." 1025938476 ECASLMPBTDRFIGNHJVUOKWQXYZ óíáéúü /=)(:><-?;»«'% ÁÉ ”“—º][–!&"""

LOWER_CASE = "eaonirsldtcumpgbyvfhqzjkñwx"
UPPER_CASE = "ECASLMPBTDRFIGNHJVUOKWQXYZ"
NUMBERS = "1025938476"
ACCENTS = "óíáéúü"
SYMBOLS1 = ",."
SYMBOLS2 = '/=)(:-?;"!'
SYMBOLS3 = "%+*#_¿¡<>[]{}"
# %%
def extract():
    filenames = (
        "el_quijote.txt",
        "1001noches1.txt",
        "1001noches2.txt",
    )

    string = ""
    for filename in filenames:
        with open(filename) as f:
            string += f.read()
    return string


def extract2():
    string = ""
    for i in range(90, 92):
        with open(f"../es-wiki/wiki_{i}") as f:
            text = re.sub(r"<[\s\S]+?>", " ", f.read())
            text = re.sub(r"\n", " ", text)
            text = re.sub(r"[ \t]{2,}", " ", text)
            string += text
    print(string[:100])
    return string


all_characters = extract2()

with open("character_dump.txt", "w") as f:
    f.write(all_characters)


# %%
def get_stats():
    unique2 = {}
    for c in all_characters:
        unique2[c] = unique2.get(c, 0) + 1
    stats = sorted(unique2.items(), key=lambda x: -x[1])
    for i, v in enumerate(stats):
        print(i, v[0], v[1])
    return stats


CHARACTERS = get_stats()

# %%
def get_sequences(characters):
    seq = set()
    buffer = " "
    for c in characters:
        if c not in ALLOWED:
            c = " "
        # if c != " " and c in FORBIDDEN:
        #     continue
        if c == " " and buffer[-1] == " ":
            continue
        buffer += c
        if len(buffer) > LENGTH:
            buffer = buffer[1:]
        if len(buffer) == LENGTH:
            seq.add(buffer)
    print(len(seq))
    print("sequence", list(seq)[:25])

    return seq


def make_predictor(sequences):
    predictor = {seq[:-1]: set() for seq in sequences}
    for seq in sequences:
        predictor[seq[:-1]].add(seq[-1])
    print(list(predictor.items())[:50])
    print("predictor length", len(predictor))
    return predictor


predictor = make_predictor(get_sequences(all_characters))

allowed = "".join([CHARACTERS[i][0] for i in range(30)])

allowed_predictor = {}

for k in predictor:
    if contains_allowed_only(k, allowed):
        intersection = predictor[k].intersection(list(allowed))
        if len(intersection) > 0:
            allowed_predictor[k] = predictor[k]
# %%
import json

serializable_predictor = {k: list(predictor[k]) for k in predictor}
with open("predictor.json", "w") as f:
    json.dump(serializable_predictor, f, separators=(",", ":"))
# %%


def gen_sequence(predictor, pre, allowed):
    counter = 0
    seq = pre
    for _ in range(1000):
        seq += choice(list(predictor[pre]))
        pre = seq[-LENGTH + 1 :]
    print(seq)
    return seq


def contains_allowed_only(pre, allowed):
    for c1 in pre:
        if c1 not in allowed:
            return False
    return True


pre = choice(list(allowed_predictor))
text = gen_sequence(allowed_predictor, pre, allowed)

# %%

# %%
