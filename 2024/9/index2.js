const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("").map((elem) => parseInt(elem, 10));
}

const layout = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

const disk = createDiskStats(layout);
const orgDisk = moveFiles(disk);
const map = createDiskMap(orgDisk);
const checkSum = calculateCheckSum(map);

console.log(`Check Sum: ${checkSum}`);

function createDiskStats(layout) {
  const disk = [];
  let fileId = 0;
  layout.forEach((elem, index) => {
    if (index % 2 == 0) {
      if (elem > 0) {
        disk.push({ type: "file", id: fileId, width: elem });
      }
      fileId++;
    } else {
      if (elem > 0) {
        disk.push({ type: "space", width: elem });
      }
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
            disk.splice(j + 1, 0, newSpace);
            i++;
            // check behind
            if (disk[j + 2].type == "space") {
              disk[j + 1].width += disk[j + 2].width;
              disk.splice(j - 2, 1);
              i--;
            }
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

function calculateCheckSum(arr) {
  return arr.reduce((sum, num, index) => {
    if (num !== ".") {
      return sum + num * index;
    } else {
      return sum;
    }
  }, 0);
}
