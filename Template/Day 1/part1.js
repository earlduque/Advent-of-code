const useExample = true; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\");
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n');

// Part 1

for (let i in input){
    
}