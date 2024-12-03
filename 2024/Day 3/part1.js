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

let total = 0

for (var j in input){
    const matches = [...input[j].matchAll(/mul\(\d+,\d+\)/g)];

    for (let i = 0; i < matches.length; i++){
        console.log(matches[i][0]);
        total += eval(matches[i][0]);
    }
}

console.log(total);

function mul(x,y){
    return Number(x)*Number(y)
}