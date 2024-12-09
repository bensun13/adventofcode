const fs = require("fs");
const path = require("path");

const currentPoint = { X: null, Y: null };

const operations = {
  ADD: (a, b) => a + b,
  MUL: (a, b) => a * b,
};

// Function to read and parse the file
function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("").map((elem) => parseInt(elem, 10));
}

const layout = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

const disk = createDiskStats(layout);
console.log(disk);
const orgDisk = moveFiles(disk);
const map = createDiskMap(orgDisk);
console.log(map);
const checkSum = calculateCheckSum(map);

console.log(`Check Sum: ${checkSum}`);

function createDiskStats(layout) {
  const disk = [];
  let fileId = 0;
  let spaceId = 0;
  layout.forEach((elem, index) => {
    if (index % 2 == 0) {
      if (elem > 0) {
        disk.push({ type: "file", id: fileId, width: elem });
      }
      fileId++;
    } else {
      if (elem > 0) {
        disk.push({ type: "space", id: spaceId, width: elem });
      }
      spaceId++;
    }
  });
  return disk;
}

function moveFiles(disk) {
  // iterate over the disk
  for (let i = disk.length - 1; i > 0; i--) {
    // find all of the files
    if (disk[i].type == "file") {
      // starting from the beginning try to find a space that fits the block
      for (let j = 0; j < i; j++) {
        // find a space that is equal or greater width than the file
        if (disk[j].type == "space" && disk[i].width <= disk[j].width) {
          // found a space that is exactly the same width. Change the array element to the file and remove the element from the back
          if (disk[j].width == disk[i].width) {
            disk[j] = { ...disk[i] };
            disk[i].type = "space";
            disk[i].id++;
            // space was too big, need to leave a space behind
          } else {
            const remainingSpace = disk[j].width - disk[i].width;
            const newSpace = {
              type: "space",
              id: disk[j].id,
              width: remainingSpace,
            };
            disk[j] = { ...disk[i] };
            disk[i].type = "space";
            disk[i].id++;
            disk.splice(j + 1, 0, newSpace);
            i++;
            // check behind
            if (j < disk.length - 2 && disk[j + 2].type == "space") {
              disk[j + 1].width += disk[j + 2].width;
              disk.splice(j - 2, 1);
              i--;
            }
          }

          // newly created space needs to be merged
          // check in front
          if (i > 0 && disk[i - 1].type == "space") {
            disk[i].width += disk[i - 1].width;
            disk.splice(i - 1, 1);
            i--;
          }
          // check behind
          if (i < disk.length - 2 && disk[i + 1].type == "space") {
            disk[i].width += disk[i + 1].width;
            disk.splice(i + 1, 1);
          }
          break;
        }
      }
    }
  }
  return disk;
}

function createDiskMap(layout) {
  const diskMap = [];
  layout.forEach((elem) => {
    if (elem.type == "file") {
      diskMap.push(...Array(elem.width).fill(elem.id));
    } else {
      diskMap.push(...Array(elem.width).fill("."));
    }
  });
  return diskMap;
}

function rearrangeArray(arr) {
  let left = 0; // Pointer for the leftmost period
  let right = arr.length - 1; // Pointer for the rightmost number

  while (left < right) {
    // Move `left` to the next period
    while (left < arr.length && arr[left] !== ".") {
      left++;
    }

    // Move `right` to the next number
    while (right >= 0 && arr[right] === ".") {
      right--;
    }

    // Swap if valid pointers are found
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
  }

  return arr;
}

function calculateCheckSum(arr) {
  return arr.reduce((sum, num, index) => {
    if (num !== ".") {
      return sum + num * index;
    } else {
      return sum;
    }
  }, 0);
}
