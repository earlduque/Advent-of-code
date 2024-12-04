const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

// Part 1

let safe = 0;

for (let i in input){
    let report = input[i].split(' ');

    report = report.map(Number);
    // console.log(report);
    if (isGradual(report)) safe++;
}

console.log(safe);

function isGradual(arr) {
    let increasing = true;
    let decreasing = true;

    for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - arr[i - 1]);

        if (diff < 1 || diff > 3) {
            return false;
        }

        if (arr[i] > arr[i - 1]) {
            decreasing = false;
        } else if (arr[i] < arr[i - 1]) {
            increasing = false;
        }
    }

    return increasing || decreasing;
}