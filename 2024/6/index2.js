const fs = require("fs");

console.log("Hello World!");

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

  const startingPoint = { X: null, Y: null, direction: directions.UP };

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].split("");
    if (row.includes("^")) {
      startingPoint.Y = i;
      startingPoint.X = lines[i].indexOf("^");
    }
    matrix.push(lines[i].split(""));
  }
  return { matrix, startingPoint };
}

// Call the function and provide the file path
const { matrix: map, startingPoint: currentPoint } =
  parseFile("./2024/6/input.txt");

const startingPoint = currentPoint;

const path = getEntirePath([...map], { ...startingPoint });

console.log(`Found ${path.size} visited positions`);

let numLoopingPos = 0;
for (const point of path) {
  const currPoint = JSON.parse(point);
  if (
    checkLoop(JSON.parse(JSON.stringify(map)), { ...startingPoint }, currPoint)
  ) {
    numLoopingPos++;
  }
}
console.log(`Number of looping positions: ${numLoopingPos}`);

function checkLoop(matrix, startingPoint, obstacle) {
  if (startingPoint.X == obstacle.X && startingPoint.Y == obstacle.Y) {
    return false;
  }
  const grid = [...matrix];
  grid[obstacle.Y][obstacle.X] = "#";
  const currentPoint = startingPoint;
  const visited = new Set([JSON.stringify(currentPoint)]);

  while (
    currentPoint.X >= 0 &&
    currentPoint.X < grid[0].length &&
    currentPoint.Y >= 0 &&
    currentPoint.Y < grid.length
  ) {
    const nextX = currentPoint.X + movement[currentPoint.direction].X;
    const nextY = currentPoint.Y + movement[currentPoint.direction].Y;
    if (
      nextY >= grid.length ||
      nextY < 0 ||
      nextX >= grid[0].length ||
      nextX < 0
    ) {
      break;
    }
    if (grid[nextY][nextX] == "#") {
      currentPoint.direction = nextDir[currentPoint.direction];
    } else {
      currentPoint.X = nextX;
      currentPoint.Y = nextY;
      const nextPointJSON = JSON.stringify(currentPoint);
      if (visited.has(nextPointJSON)) {
        return true;
      }
      if (visited.size > 100000) {
        return true;
      }
      visited.add(nextPointJSON);
    }
  }
  return false;
}

function getEntirePath(grid, startingPoint) {
  const currentPoint = startingPoint;
  const visited = new Set([JSON.stringify(currentPoint)]);

  console.log(`Guard is starting out at ${currentPoint.X},${currentPoint.Y}`);

  while (
    currentPoint.X >= 0 &&
    currentPoint.X < grid[0].length &&
    currentPoint.Y >= 0 &&
    currentPoint.Y < grid.length
  ) {
    const nextX = currentPoint.X + movement[currentPoint.direction].X;
    const nextY = currentPoint.Y + movement[currentPoint.direction].Y;
    if (
      nextY >= grid.length ||
      nextY < 0 ||
      nextX >= grid[0].length ||
      nextX < 0
    ) {
      break;
    }
    if (grid[nextY][nextX] == "#") {
      currentPoint.direction = nextDir[currentPoint.direction];
    } else {
      currentPoint.X = nextX;
      currentPoint.Y = nextY;
      visited.add(JSON.stringify(currentPoint));
    }
  }
  return visited;
}
