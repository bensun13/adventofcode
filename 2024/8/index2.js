const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");
  return lines.map((elem) => elem.split(""));
}
const antiNodes = new Set();
const matrix = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

const hashMap = createHashMap(matrix);

processCombinations(hashMap);

function processCombinations(hashMap) {
  // For each character in the hash map
  for (const char in hashMap) {
    const coordinates = hashMap[char];

    // Generate all combinations of coordinate pairs
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        // Apply the callback function to the pair of coordinates

        const nodes = findAntinodes(matrix, coordinates[i], coordinates[j]);
        nodes.forEach((elem) => {
          antiNodes.add(JSON.stringify(elem));
        });
      }
    }
  }
}

console.log(`Number of antinodes: ${antiNodes.size}`);

function findAntinodes(grid, node1, node2) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const [x1, y1] = node1;
  const [x2, y2] = node2;

  const dx = x2 - x1;
  const dy = y2 - y1;

  const antinodes = [];

  // Check in the forward direction
  // these numbers are arbitrary and there is probably a better way to find the bounds
  for (let k = -150; k <= 150; k++) {
    const xAntinode = x2 + k * dx;
    const yAntinode = y2 + k * dy;

    if (
      xAntinode >= 0 &&
      xAntinode < numRows &&
      yAntinode >= 0 &&
      yAntinode < numCols
    ) {
      antinodes.push([xAntinode, yAntinode]);
    }
  }

  return antinodes;
}

function createHashMap(grid) {
  const hashMap = {};

  // Traverse the grid and populate the hash map
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const char = grid[i][j];
      if (/[a-zA-Z0-9]/.test(char)) {
        if (!hashMap[char]) {
          hashMap[char] = [];
        }
        hashMap[char].push([i, j]);
      }
    }
  }

  return hashMap;
}
