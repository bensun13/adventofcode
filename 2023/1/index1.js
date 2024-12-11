const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const map = [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  lines.forEach((elem) => {
    map.push(elem.trim().split(""));
  });

  return map;
}

const numbersMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const rows = parseFile(path.resolve(__dirname, "input.txt"), "utf8");

let result = 0;
for (const arr of rows) {
  const line = arr.join("");
  const numbers = [];
  for (const [key, value] of Object.entries(numbersMap)) {
    numbers.push(
      ...line.matchAll(new RegExp(key, "g")),
      ...line.matchAll(new RegExp(value, "g"))
    );
  }
  numbers.sort((a, b) => a.index - b.index);

  console.log(
    parseInt(
      `${
        numbers[0][0].length > 1
          ? numbersMap[numbers[0][0]]
          : parseInt(numbers[0][0])
      }${
        numbers[numbers.length - 1][0].length > 1
          ? numbersMap[numbers[numbers.length - 1][0]]
          : parseInt(numbers[numbers.length - 1][0])
      }`
    )
  );

  result += parseInt(
    `${
      numbers[0][0].length > 1
        ? numbersMap[numbers[0][0]]
        : parseInt(numbers[0][0])
    }${
      numbers[numbers.length - 1][0].length > 1
        ? numbersMap[numbers[numbers.length - 1][0]]
        : parseInt(numbers[numbers.length - 1][0])
    }`
  );
}

console.log(result);

const regex = /^(one|two|three|four|five|six|seven|eight|nine)/i;

let numeralMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const sum = rows.reduce((acc, curr) => {
  let firstNumber = null;
  let currNumber = null;
  for (let i = 0; i < curr.length; i++) {
    if (!isNaN(curr[i]) && curr[i].trim() !== "") {
      currNumber = curr[i];
      if (firstNumber === null) {
        firstNumber = curr[i];
      }
    } else {
      let match = curr.join("").substring(i).match(regex);
      if (match) {
        let writtenNumber = match[0].toLowerCase();

        let numeral = numeralMap[writtenNumber];
        currNumber = numeral;
        if (firstNumber === null) {
          firstNumber = numeral;
        }
      }
    }
  }
  return acc + parseInt(`${firstNumber}${currNumber}`, 10);
}, 0);

console.log(`Sum: ${sum}`);
