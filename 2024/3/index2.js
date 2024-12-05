const fs = require("fs");

console.log("Hello World!");

// Function to read and parse the file
function parseFile(filePath) {
  const reports = [];

  const data = fs.readFileSync(filePath, "utf-8");

  return data.split("\n");
}

// Call the function and provide the file path
const reports = parseFile("./2024/3/input.txt");

// Process each line
let include = true;
let totalSum = 0;
for (let line of reports) {
  const splits = line.split(/(don't\(\)|do\(\))/);
  totalSum += splits.reduce((acc, curr) => {
    if (curr == "don't()") {
      include = false;
      return acc;
    } else if (curr == "do()") {
      include = true;
      return acc;
    } else if (include) {
      const regex = /mul\(\d+,\d+\)/g;

      // Find all matches
      const matches = curr.match(regex);
      if (matches !== null && matches.length > 0) {
        return (
          acc +
          matches.reduce((accSub, currSub) => {
            return accSub + mulString(currSub);
          }, 0)
        );
      }
    }
    return acc;
  }, 0);
}

function mulString(input) {
  const numbers = input.slice(4, -1).split(",");
  // console.log(`${input} - ${numbers[0]}*${numbers[1]}`)
  return parseInt(numbers[0], 10) * parseInt(numbers[1], 10);
}

console.log(`Total Sum: ${totalSum}`);
