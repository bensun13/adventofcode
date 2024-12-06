const fs = require("fs");

console.log("Hello World!");

// Function to read and parse the file
function parseFile(filePath) {
  const rules = [];
  const updates = [];

  const data = fs.readFileSync(filePath, "utf-8");

  const segments = data.split("\n\n");

  if (segments.length !== 2) {
    throw new Error("Invalid format");
  }
  for (let rule of segments[0].split("\n")) {
    rules.push(rule.split("|").map((elem) => parseInt(elem, 10)));
  }
  for (let update of segments[1].split("\n")) {
    updates.push(update.split(",").map((elem) => parseInt(elem, 10)));
  }
  return { rules, updates };
}

// Call the function and provide the file path
const { rules, updates } = parseFile("./2024/5/input.txt");

let totalSum = 0;

updates.forEach((update, index) => {
  if (invalidUpdate(update, rules)) {
    const sorted = sortUpdate(update, rules);
    totalSum += findMiddleNumber(sorted);
  }
});

console.log(`Total Sum: ${totalSum}`);

function sortUpdate(update, rules) {
  for (let i = 0; i < rules.length; i++) {
    if (update.includes(rules[i][0]) && update.includes(rules[i][1])) {
      // sort new array
      if (update.indexOf(rules[i][0]) > update.indexOf(rules[i][1])) {
        moveElement(
          update,
          update.indexOf(rules[i][0]),
          update.indexOf(rules[i][1])
        );
        sortUpdate(update, rules);
        break;
      }
    }
  }
  return update;
}

function invalidUpdate(update, rules) {
  for (let i = 0; i < rules.length; i++) {
    if (update.includes(rules[i][0]) && update.includes(rules[i][1])) {
      if (update.indexOf(rules[i][0]) > update.indexOf(rules[i][1])) {
        return true;
      }
    }
  }
  return false;
}

function findMiddleNumber(arr) {
  return arr[Math.floor(arr.length / 2)];
}

function moveElement(arr, fromIndex, toIndex) {
  // Check if the indices are valid
  if (
    fromIndex < 0 ||
    fromIndex >= arr.length ||
    toIndex < 0 ||
    toIndex >= arr.length
  ) {
    throw new Error("Invalid indices");
  }

  // Remove the element from the original position
  const [element] = arr.splice(fromIndex, 1);

  // Insert the element at the new position
  arr.splice(toIndex, 0, element);

  return arr; // Return the modified array
}
