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
  if (validUpdate(update, rules)) {
    totalSum += findMiddleNumber(update);
  }
});

console.log(`Total Sum: ${totalSum}`);

function validUpdate(update, rules) {
  for (let i = 0; i < rules.length; i++) {
    if (update.includes(rules[i][0]) && update.includes(rules[i][1])) {
      if (update.indexOf(rules[i][0]) > update.indexOf(rules[i][1])) {
        return false;
      }
    }
  }
  return true;
}

function findMiddleNumber(arr) {
  return arr[Math.floor(arr.length / 2)];
}
