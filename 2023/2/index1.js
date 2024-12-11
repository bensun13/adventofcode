const fs = require("fs");
const path = require("path");

// Function to read and parse the file
function parseFile(filePath) {
  const map = [];

  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  let sum = 0;

  lines.forEach((elem) => {
    const parts = elem.split(":");
    const draws = parts[1].split(";");
    const colors = ["blue", "red", "green"];
    const maxNumbers = {};

    colors.forEach((color) => {
      const regex = new RegExp(`(\\d+)\\s+${color}`, "g"); // Match numbers preceding each color
      let match;
      let numbers = [];

      // Extract all numbers for the current color
      while ((match = regex.exec(draws)) !== null) {
        numbers.push(Number(match[1]));
      }

      // Calculate the maximum number for the current color
      maxNumbers[color] = numbers.length > 0 ? Math.max(...numbers) : 0;
    });

    console.log(maxNumbers);
    if (
      maxNumbers.red <= 12 &&
      maxNumbers.green <= 13 &&
      maxNumbers.blue < 14
    ) {
      sum += parseInt(parts[0].match(/^Game\s+(\d+)/)[1], 10);
    }
  });

  console.log(`Sum: ${sum}`);
}

const rows = parseFile(path.resolve(__dirname, "input.txt"), "utf8");
