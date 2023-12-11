const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let inputOG = fs.readFileSync(fileName, 'utf-8');
let input = inputOG.split('\r\n');

// Part 1

const overallIndex = inputOG.indexOf('S');
const textBeforeS = inputOG.substring(0, overallIndex);
const row = textBeforeS.split('\n').length - 1;
const lastNewLineIndex = textBeforeS.lastIndexOf('\n');
const column = overallIndex - lastNewLineIndex - 1;

console.log(`Start at row: ${row}, column: ${column}`);

const map = {
    'e': [0,1],
    's': [1,0],
    'w': [0,-1],
    'n': [-1,0],
    '|': ['n','s'],
    '-': ['w','e'],
    'L': ['n','e'],
    'J': ['n','w'],
    '7': ['w','s'],
    'F': ['e','s'],
}
const approach = {
    'e': 'w',
    's': 'n',
    'w': 'e',
    'n': 's',
}

const visited = [row+'x'+column];

let current = [row,column];
let direction = 'e';

while (true){
    current[0] += map[direction][0];
    current[1] += map[direction][1];
    if (visited.indexOf(current[0]+'x'+current[1]) != -1){
        break;
    } else {
        visited.push(current[0]+'x'+current[1])
    }
    if (map[input[current[0]].charAt(current[1])][0] === approach[direction]) {
        direction = map[input[current[0]].charAt(current[1])][1];
    } else {
        direction = map[input[current[0]].charAt(current[1])][0];
    }
    // console.log(input[current[0]].charAt(current[1]) + direction);
}
console.log(visited.length/2);