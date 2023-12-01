const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\");
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n');

// Part 1
let total = 0;
for (let i in input){
    const arr = input[i].split(/-|\s|:\s/);
    const re = new RegExp(arr[2],"g");
    const matches = [...arr[3].matchAll(re)];
    if (matches.length >= parseInt(arr[0]) && matches.length <= parseInt(arr[1])){
        total++;
    }
}
console.log(total);