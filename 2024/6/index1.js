const fs = require("fs");

console.log("Hello World!");
const currentPoint = { X: null, Y: null };

const directions = {
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
};

const movement = {
  [directions.UP]: { X: 0, Y: -1 },
  [directions.DOWN]: { X: 0, Y: 1 },
  [directions.RIGHT]: { X: 1, Y: 0 },
  [directions.LEFT]: { X: -1, Y: 0 },
};

const nextDir = {
  [directions.UP]: directions.RIGHT,
  [directions.RIGHT]: directions.DOWN,
  [directions.DOWN]: directions.LEFT,
  [directions.LEFT]: directions.UP,
};

// Function to read and parse the file
function parseFile(filePath) {
  const matrix = [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].split("");
    if (row.includes("^")) {
      currentPoint.Y = i;
      currentPoint.X = lines[i].indexOf("^");
    }
    matrix.push(lines[i].split(""));
  }
  return matrix;
}

// Call the function and provide the file path
const grid = parseFile("./2024/6/input.txt");

const visited = new Set([JSON.stringify(currentPoint)]);

console.log(`Guard is starting out at ${currentPoint.X},${currentPoint.Y}`);

let currentDir = directions.UP;
let numSteps = 1;
let numStepsCurrDir = 0;

while (
  currentPoint.X >= 0 &&
  currentPoint.X < grid[0].length &&
  currentPoint.Y >= 0 &&
  currentPoint.Y < grid.length
) {
  const nextX = currentPoint.X + movement[currentDir].X;
  const nextY = currentPoint.Y + movement[currentDir].Y;
  if (
    nextY >= grid.length ||
    nextY < 0 ||
    nextX >= grid[0].length ||
    nextX < 0
  ) {
    break;
  }
  if (grid[nextY][nextX] == "#") {
    console.log(`${numStepsCurrDir} steps going ${currentDir}`);
    numStepsCurrDir = 0;
    currentDir = nextDir[currentDir];
    // console.log(
    //   `Found obstable at ${nextX},${nextY} - changing direction to ${currentDir}`
    // );
  } else {
    numStepsCurrDir++;
    currentPoint.X = nextX;
    currentPoint.Y = nextY;
    visited.add(JSON.stringify(currentPoint));
    numSteps++;
    // console.log(
    //   `Moving to ${currentPoint.X},${currentPoint.Y} - Current direction: ${currentDir}`
    // );
  }
}

console.log(`Number of steps: ${numSteps} - ${visited.size}`);
