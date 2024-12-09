const fs = require("fs");
const path = require("path");

console.log("Hello World!");
const currentPoint = { X: null, Y: null };

const operations = {
  ADD: (a, b) => a + b,
  MUL: (a, b) => a * b,
};

// Function to read and parse the file
function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");
  const rows = lines.map((elem) => {
    const line = {};
    const parts = elem.split(":");
    line.result = parseInt(parts[0], 10);
    line.values = parts[1]
      .trim()
      .split(" ")
      .map((num) => parseInt(num, 10));
    return line;
  });

  return rows;
}

const calibrations = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

console.log(calibrations);

const calibrationResult = calibrations.reduce((acc, curr) => {
  if (canReachSum(curr.values, curr.result)) {
    return acc + curr.result;
  }
  return acc;
}, 0);

console.log(`Total Result: ${calibrationResult}`);

function canReachSum(array, targetSum) {
  // Helper function to recursively explore possibilities
  function helper(index, currentSum) {
    // Base case: If we've processed all numbers, check if the current sum equals the target
    if (index === array.length) {
      return currentSum === targetSum;
    }

    // Recursive case: Try adding and multiplying the current number
    return (
      helper(index + 1, currentSum + array[index]) || // Try addition
      helper(index + 1, currentSum * array[index]) // Try multiplication
    );
  }

  // Start recursion from the first index with the first number
  return helper(1, array[0]);
}
