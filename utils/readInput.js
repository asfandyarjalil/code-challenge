const { readFileSync } = require("fs");
const readInput = (file) => {
  let output = readFileSync(file, "utf8").split("\n");
  return output;
};

module.exports = { readInput };
