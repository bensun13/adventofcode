const fs = require('fs');

console.log('Hello World!');

// Function to read and parse the file
function parseFile(filePath) {
    // Arrays to hold the first and second values
    const firstValues = [];
    const secondValues = {};

    // Read the file synchronously (you can use async methods if preferred)
    const data = fs.readFileSync(filePath, 'utf-8');

    // Split the file into lines
    const lines = data.split('\n');

    // Process each line
    for (let line of lines) {
        if (line.trim() === '') continue; // Skip empty lines
        const [first, second] = line.split('   '); // Split by tab

        const firsVal = parseInt(first, 10);
        const secondVal = parseInt(second, 10);

        firstValues.push(firsVal); // Add the first value to the array
        if (secondValues[secondVal] === undefined) {
            secondValues[secondVal] = 1;
        } else {
            secondValues[secondVal]++;
        }
    }
    return { firstValues, secondValues };
}

// Call the function and provide the file path
const { firstValues, secondValues } = parseFile('input.txt');

const sum = firstValues.reduce((acc, curr) => {
    if (secondValues[curr] !== undefined) {
        return acc + (curr * secondValues[curr])
    } else {
        return acc 
    }
}, 0)

console.log(`The total is ${sum}`);



