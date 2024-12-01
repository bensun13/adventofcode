const fs = require('fs');

function parseFile(filePath) {
    const firstValues = [];
    const secondValues = [];

    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');


    for (let line of lines) {
        if (line.trim() === '') continue; // Skip empty lines
        const [first, second] = line.split('   '); // Split by tab
        firstValues.push(parseInt(first,10)); // Add the first value to the array
        secondValues.push(parseInt(second,10)); // Add the second value to the array
    }

    return { firstValues, secondValues };
}

const { firstValues, secondValues } = parseFile('input.txt');

// Sort the arrays
firstValues.sort((a, b) => a - b); // Sort numerically
secondValues.sort((a, b) => a - b); // Sort numerically

const sumDifference = firstValues.reduce((acc, curr, index) => acc + Math.abs(curr - secondValues[index]), 0);

console.log(`Sum of differences: ${sumDifference}`)



