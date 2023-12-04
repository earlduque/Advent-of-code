const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n');

// Part 1

let freq = 0;
for (let i of input){
    if (i[0] === "+"){
        freq += parseInt(i.slice(1));
    } else {
        freq -= parseInt(i.slice(1));
    }
}
console.log(freq);