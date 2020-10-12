const fs = require("fs");
const util = require("util");
const pako = require("pako");

const log_file = fs.createWriteStream(__dirname + "/predictor.js.min", {
  flags: "w",
});

var enc = new TextEncoder(); // always utf-8

const compress = (data) => {
  input = enc.encode(data);
  console.log(input);
  return pako.deflate(input);
};

fs.readFile("predictor.json", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  const compressed = compress(data);
  log_file.write(util.format(compressed));
});
