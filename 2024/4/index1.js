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
  function checkDirection(r, c, dr, dc) {
    for (let i = 0; i < wordLength; i++) {
      const newRow = r + i * dr;
      const newCol = c + i * dc;
      if (
        newRow < 0 ||
        newRow >= rows || // Check row boundaries
        newCol < 0 ||
        newCol >= cols || // Check column boundaries
        grid[newRow][newCol] !== word[i] // Check character match
      ) {
        return false;
      }
    }
    return true;
  }

  // Iterate through each cell in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Check all 8 directions
      const directions = [
        [0, 1], // Horizontal right
        [1, 0], // Vertical down
        [0, -1], // Horizontal left
        [-1, 0], // Vertical up
        [1, 1], // Diagonal down-right
        [-1, -1], // Diagonal up-left
        [1, -1], // Diagonal down-left
        [-1, 1], // Diagonal up-right
      ];
      for (const [dr, dc] of directions) {
        if (checkDirection(r, c, dr, dc)) {
          count++;
        }
      }
    }
  }

  return count;
}
