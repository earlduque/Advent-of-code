const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

// Part 2

let currentPosition = 50;
let actualPassword = 0;

for (let i in input){
    const distance = parseInt(input[i].slice(1));
    
    if (input[i].indexOf('L') > -1){
        if (currentPosition === 0) {
            actualPassword += Math.floor(distance / 100);
        } else {
            actualPassword += Math.floor(distance / 100);
            if (distance % 100 >= currentPosition) {
                actualPassword++;
            }
        }
        
        currentPosition = ((currentPosition - distance) % 100 + 100) % 100;
    } else {
        actualPassword += Math.floor(distance / 100);
        if (currentPosition + (distance % 100) >= 100) {
            actualPassword++;
        }
        
        currentPosition = (currentPosition + distance) % 100;
    }
}

console.log(actualPassword);