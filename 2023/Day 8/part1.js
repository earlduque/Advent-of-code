const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const { dir } = require('console');
const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

const directions = input[0];
input.shift(); input.shift();

const reSplit = / = \(|, |\)/g;
const map = {};
const starts = [];
for (let i in input){
    const instruction = input[i].split(reSplit);
    if (instruction[0].charAt(2) == "A") starts.push(instruction[0]);
    map[instruction[0]] = {
        "L": instruction[1],
        "R": instruction[2]
    };
}
// console.log(starts);

const stepArray = [];

for (let i of starts){
    let searching = true;
    let current = i;
    steps = 0;
    while (searching){
        current = map[current][directions[steps%directions.length]];
        steps++;
        if (current.charAt(2) == 'Z'){
            searching = false;
        }
    }
    stepArray.push(steps);
}

function gcd(a, b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function findLCMofArray(stepArray) {
    let result = stepArray[0];
    for (let i in stepArray) {
        result = lcm(result, stepArray[i]);
    }
    return result;
}

console.log(findLCMofArray(stepArray));