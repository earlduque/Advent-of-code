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

let currentPosition = 50;
let actualPassword = 0;

for (let i in input){
    if (input[i].indexOf('L') > -1 ){
        currentPosition -= parseInt(input[i].slice(1));
        // currentPosition = currentPosition < 0 ? 100 + currentPosition : currentPosition;
        while (currentPosition < 0){
            currentPosition += 100;
        }
    } else {
        currentPosition += parseInt(input[i].slice(1));
        // currentPosition = currentPosition % 100 == 100 ? 0 : currentPosition % 100;
        currentPosition = currentPosition % 100;
    }
    // console.log(currentPosition);
    if (currentPosition === 0) {
        actualPassword++;
    }
}

console.log(actualPassword);