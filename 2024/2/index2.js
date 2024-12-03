const fs = require('fs');

console.log('Hello World!');

// Function to read and parse the file
function parseFile(filePath) {
    const reports = [];

    const data = fs.readFileSync(filePath, 'utf-8');

    const lines = data.split('\n');

    // Process each line
    for (let line of lines) {
        const report = line.split(' '); // Split by tab
        reports.push(report.map(elem => parseInt(elem, 10)))
    }
    return reports;
}

// Call the function and provide the file path
const reports = parseFile('./2024/2/input.txt');

const safeReportCount = reports.reduce((acc, curr) => {
    return isSafeReport(curr) ? acc + 1 : acc;
}, 0)

console.log(`${safeReportCount} safe reports`);

function isSafeReport(arr) {
    if (arr.length < 2) return true; // A single element or empty array is considered monotonic

    // Helper function to check monotonicity and difference condition
    const checkMonotonic = (array) => {
        let isIncreasing = null;

        for (let i = 1; i < array.length; i++) {
            const diff = array[i] - array[i - 1];
            const absDiff = Math.abs(diff);

            // Check if the absolute difference is within the range [1, 3]
            if (absDiff < 1 || absDiff > 3) {
                return false;
            }

            // Determine monotonicity
            if (isIncreasing === null) {
                if (diff > 0) {
                    isIncreasing = true;
                } else if (diff < 0) {
                    isIncreasing = false;
                }
            } else {
                // Check if the monotonicity is violated
                if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
                    return false;
                }
            }
        }
        return true;
    };

    // Check the original array
    if (checkMonotonic(arr)) {
        return true;
    }

    // Check if removing one element makes the array valid
    for (let i = 0; i < arr.length; i++) {
        const newArray = [...arr.slice(0, i), ...arr.slice(i + 1)];
        if (checkMonotonic(newArray)) {
            return true;
        }
    }

    return false;
}