const fs = require("fs");

console.log("Hello World!");

// Function to read and parse the file
function parseFile(filePath) {
  const matrix = [];

  const data = fs.readFileSync(filePath, "utf-8");

  const lines = data.split("\n");

  // Process each line
  for (let line of lines) {
    matrix.push(line.split(""));
  }
  return matrix;
}

// Call the function and provide the file path
const grid = parseFile("./2024/4/input.txt");

for (let x = 0; x < grid[0].length; x++) {}

console.log(countOccurrences(grid, "XMAS"));
function countOccurrences(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;
  const wordLength = word.length;
  let count = 0;

  // Helper function to check if the word exists starting at (r, c) in the given direction
  function checkMasCross(r, c) {
    return (
      [grid[r - 1][c - 1], grid[r + 1][c + 1]].sort().join("") === "MS" &&
      [grid[r + 1][c - 1], grid[r - 1][c + 1]].sort().join("") === "MS"
    );
  }

  // Iterate through each cell in the grid
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      // Check all 8 directions
      if (grid[r][c] == "A") {
        if (checkMasCross(r, c)) {
          count++;
        }
      }
    }
  }

  return count;
}
