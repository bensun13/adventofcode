const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("").map((elem) => parseInt(elem, 10));
}

const layout = parseFile(path.resolve(__dirname, "input.txt"), "utf8");
const disk = createDiskMap(layout);
const defraggedDisk = rearrangeArray(disk);
const checkSum = calculateCheckSum(defraggedDisk);
console.log(`Check Sum: ${checkSum}`);

function createDiskMap(layout) {
  const diskMap = [];
  let fileId = 0;
  layout.forEach((elem, index) => {
    const num = parseInt(elem, 10);
    if (index % 2 == 0) {
      // it's a file
      if (num > 0) {
        diskMap.push(...Array(num).fill(fileId));
      }
      fileId++;
    } else {
      // it's spaces
      if (num > 0) {
        diskMap.push(...Array(num).fill("."));
      }
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
