const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const map = [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  lines.forEach((elem) => {
    map.push(elem.split(" ").map((elem) => parseInt(elem, 10)));
  });

  return map;
}

const map = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

const stones = map[0];

const blinks = 25;
const result = processArrayEfficiently(stones, blinks);
console.log(`Number of stones: ${result.length}`);

function processArrayEfficiently(arr, iterations) {
  for (let iter = 0; iter < iterations; iter++) {
    console.log(`Blink #${iter}. ${arr.length} stones`);
    let result = [];
    for (let num of arr) {
      if (num === 0) {
        // Rule 1: Turn 0 into 1
        result.push(1);
      } else if (num.toString().length % 2 === 0) {
        // Rule 2: Split even-digit numbers
        const str = num.toString();
        const mid = str.length / 2;
        result.push(Number(str.slice(0, mid)), Number(str.slice(mid)));
      } else {
        // Rule 3: Multiply by 2024
        result.push(num * 2024);
      }
    }
    arr = result; // Update the array for the next iteration
  }
  return arr;
}
