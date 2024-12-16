const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const map = [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  lines.forEach((elem) => {
    map.push(elem.split(""));
  });

  return map;
}

const map = parseFile(path.resolve(__dirname, "input.txt"), "utf8");
console.table(map);

const directions = {
  UP: [0, -1],
  DOWN: [0, 1],
  RIGHT: [1, 0],
  LEFT: [-1, 0],
};

const regions = {};
const seen = new Set();

for (let row = 0; row < map.length; row++) {
  for (let column = 0; column < map.length; column++) {
    if (!seen.has(JSON.stringify([row, column]))) {
      seen.add(JSON.stringify([row, column]));
      let currRegion = new Set([JSON.stringify([row, column])]);
      const currLetter = map[row][column];
      const newRegion = detectRegion(
        map,
        currRegion,
        [row, column],
        currLetter
      );
      if (regions[currLetter] === undefined) {
        regions[currLetter] = [newRegion];
      } else {
        regions[currLetter].push(newRegion);
      }
    }
  }
}

let cost = 0;
for (const region in regions) {
  cost += regions[region].reduce((acc, curr) => {
    return acc + calculateCostOfregion(curr, region);
  }, 0);
}
console.log(`Cost: ${cost}`);

function detectRegion(map, currentRegion, position, letter) {
  // check all four direction to see if they match the origin
  for (let direction in directions) {
    const newRow = position[0] + directions[direction][0];
    const newColumn = position[1] + directions[direction][1];
    if (
      newRow >= 0 &&
      newRow < map.length &&
      newColumn >= 0 &&
      newColumn < map[0].length &&
      !currentRegion.has(JSON.stringify([newRow, newColumn])) &&
      map[newRow][newColumn] == letter
    ) {
      currentRegion.add(JSON.stringify([newRow, newColumn]));
      seen.add(JSON.stringify([newRow, newColumn]));
      detectRegion(map, currentRegion, [newRow, newColumn], letter);
    }
  }
  return currentRegion;
}

function calculateCostOfregion(region, letter) {
  let area = region.size;
  let perimeter = 0;
  for (const parcelJSON of region) {
    const parcel = JSON.parse(parcelJSON);
    for (let direction in directions) {
      const newRow = parseInt(parcel[0], 10) + directions[direction][0];
      const newColumn = parseInt(parcel[1], 10) + directions[direction][1];
      if (
        newRow < 0 ||
        newRow > map.length - 1 ||
        newColumn < 0 ||
        newColumn > map[0].length - 1 ||
        map[newRow][newColumn] != letter
      ) {
        perimeter++;
      }
    }
  }
  console.log(
    `${letter} region cost ${area} * ${perimeter} = ${
      area * perimeter
    } - ${JSON.stringify(region)}`
  );
  return area * perimeter;
}
