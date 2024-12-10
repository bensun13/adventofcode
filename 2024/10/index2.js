const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const map = [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  lines.forEach((elem) => {
    map.push(elem.split("").map((num) => parseInt(num, 10)));
  });

  return map;
}

const map = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

const trailheads = findTrailheads(map);

const sum = trailheads.reduce((acc, curr) => {
  const score = findPathsToNine(map, curr[0], curr[1]);
  console.log(`Trailhead ${curr[0]}/${curr[1]} has a score of ${score}`);

  return acc + score;
}, 0);

console.log(`Sum: ${sum}`);

function findTrailheads(map) {
  let trailheads = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 0) {
        trailheads.push([row, col]);
      }
    }
  }

  return trailheads;
}

function findPathsToNine(matrix, startRow, startCol) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let uniquePaths = 0;

  // Helper function for DFS
  function dfs(row, col, visited) {
    // Base case: If the value is 9, we found a unique path
    if (matrix[row][col] === 9) {
      uniquePaths++;
      return;
    }

    // Mark the current cell as visited
    visited[row][col] = true;

    // Directions for moving (up, down, left, right)
    const directions = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];

    // Explore all possible moves
    for (let [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check if the move is valid
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol] &&
        matrix[newRow][newCol] === matrix[row][col] + 1
      ) {
        dfs(newRow, newCol, visited);
      }
    }

    // Unmark the current cell for other paths
    visited[row][col] = false;
  }

  // Initialize the visited matrix
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // Start DFS from the given coordinate
  dfs(startRow, startCol, visited);
  return uniquePaths;
}
