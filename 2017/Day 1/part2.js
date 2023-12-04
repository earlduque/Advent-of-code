const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n')[0];

// Part 2

let total = 0;
for (let i = 0; i < input.length; i++){
    if (input[i] == input[(i+(input.length/2)) % input.length]) total += parseInt(input[i]);
}
console.log(total);