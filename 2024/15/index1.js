const fs = require("fs");
const path = require("path");

const deltas = {
  "^": [-1, 0], // Up
  v: [1, 0], // Down
  "<": [0, -1], // Left
  ">": [0, 1], // Right
};

// Function to read and parse the file
function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n\n");

  const mapLines = lines[0];
  const directionsLines = lines[1];
  let startingPosition = [];

  const map = mapLines.split("\n").map((elem, rowNum) => {
    const row = elem.split("");
    if (row.includes("@")) {
      startingPosition = [row.indexOf("@"), rowNum];
    }
    return row;
  });
  const directions = directionsLines.split("\n").reduce((acc, curr) => {
    curr.split("").forEach((subelem) => {
      acc.push(subelem);
    });
    return acc;
  }, []);

  // map should be a 2d array, directions should be an array of directions
  return { map, directions, startingPosition };
}

const { map, directions, startingPosition } = parseFile(
  path.resolve(__dirname, "input.txt"),
  "utf8"
);

performMovement(map, startingPosition, directions);

console.log(`GPS Coordinate Sum: ${calculateBoxValue(map)}`);

function performMovement(grid, startPos, movements) {
  let robotPos = startPos;

  for (const direction of movements) {
    const [dx, dy] = deltas[direction];
    const [x, y] = robotPos;
    const nx = x + dx; // Next robot position
    const ny = y + dy;

    // Check boundaries and if it's a wall
    if (
      nx < 0 ||
      nx >= grid.length ||
      ny < 0 ||
      ny >= grid[0].length ||
      grid[nx][ny] === "#"
    ) {
      continue; // Robot doesn't move
    }

    if (grid[nx][ny] === "O") {
      // There's a box, handle chain pushing
      let currentBoxX = nx;
      let currentBoxY = ny;
      let canMove = true;

      // Keep pushing boxes along the direction if possible
      while (canMove) {
        const nextBoxX = currentBoxX + dx;
        const nextBoxY = currentBoxY + dy;

        // Check if the next position for the box is valid
        if (
          nextBoxX >= 0 &&
          nextBoxX < grid.length &&
          nextBoxY >= 0 &&
          nextBoxY < grid[0].length &&
          grid[nextBoxX][nextBoxY] === "."
        ) {
          // Move the current box forward
          currentBoxX = nextBoxX;
          currentBoxY = nextBoxY;
          canMove = false;
        } else if (
          nextBoxX < 0 ||
          nextBoxX >= grid.length ||
          nextBoxY < 0 ||
          nextBoxY >= grid[0].length ||
          grid[nextBoxX][nextBoxY] === "#"
        ) {
          // Blocked by a wall
          canMove = false;
        } else if (grid[nextBoxX][nextBoxY] === "O") {
          // Another box, continue checking
          currentBoxX = nextBoxX;
          currentBoxY = nextBoxY;
        } else {
          // Blocked by something else (invalid position)
          canMove = false;
        }
      }

      // If we ended in a valid position, move all boxes in the chain
      if (grid[currentBoxX][currentBoxY] === ".") {
        // Move the initial box
        grid[currentBoxX][currentBoxY] = "O";
        grid[nx][ny] = "O";
        // Move the robot
        grid[x][y] = ".";
        grid[nx][ny] = "@";
        robotPos = [nx, ny];
      }
    } else {
      // Empty space, move the robot
      grid[nx][ny] = "@";
      grid[x][y] = ".";
      robotPos = [nx, ny];
    }
  }
}

function calculateBoxValue(grid) {
  // calculate the box values
  return grid.reduce((acc, curr, row) => {
    return curr.reduce((subacc, curr, column) => {
      if (curr == "O") {
        subacc += 100 * row + column;
      }
      return subacc;
    }, acc);
  }, 0);
}
