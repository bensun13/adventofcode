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

console.log(reports[0]);

const safeReportCount = reports.reduce((acc, curr) => {
    return isSafeReport(curr) ? acc + 1 : acc;
}, 0)

console.log(`${safeReportCount} safe reports`);

function isSafeReport(report) {    
    console.log(`Analytizing Report: ${report}`)
    const trendUp = (report[1] > report[0]);
    console.log(`${report[1]} > ${report[0]} = ${trendUp}`)
    for (let i = 1; i < report.length; i++) {        
        if (trendUp && report[i-1] > report[i]) {
            return false;
        } 
        if (!trendUp && report[i-1] < report[i]) {
            return false;
        }
        const diff = Math.abs(report[i-1]-report[i]);        
        if (diff < 1 || diff > 3) {
            console.log(`Comparing Previous Level to Current: ${report[i-1]} - ${report[i]} = ABS(${diff})`);
            console.log('unsafe levels');
            return false
        }
    }    
    console.log('safe report');
    return true;
}