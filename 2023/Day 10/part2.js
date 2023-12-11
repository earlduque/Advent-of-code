const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let inputOG = fs.readFileSync(fileName, 'utf-8');
let input = inputOG.split('\r\n');

// Part 2

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
const loop = [[row,column]];

let current = [row,column];
let direction = 'e'; //CHECK FIRST FOR EACH DATASET

while (true){
    current[0] += map[direction][0];
    current[1] += map[direction][1];
    if (visited.indexOf(current[0]+'x'+current[1]) != -1){
        break;
    } else {
        visited.push(current[0]+'x'+current[1])
        loop.push([current[0],current[1]]);
    }
    if (map[input[current[0]].charAt(current[1])][0] === approach[direction]) {
        direction = map[input[current[0]].charAt(current[1])][1];
    } else {
        direction = map[input[current[0]].charAt(current[1])][0];
    }
}

const sortedLoop = loop.sort((a, b) => {
    if (a[0] === b[0]) {
        return a[1] - b[1];
    }
    return a[0] - b[0];
});

let inside = 0;
let pipes = 0;

const pipeCrosses = {
    'F': 'J',
    'L': '7',
}
const pipeExclude = {
    'L': 'J',
    'F': '7',
}

thisPipe = '';
for (let i = 0; i < sortedLoop.length - 1; i++){
    if (sortedLoop[i][0] == sortedLoop[parseInt(i)+1][0]){
        thisPipe += input[sortedLoop[i][0]].charAt(sortedLoop[i][1]);
        if (thisPipe.indexOf('|') != -1 || (thisPipe.length > 1 && pipeCrosses[thisPipe.charAt(0)] == thisPipe.charAt(thisPipe.length - 1))){
            pipes++;
            thisPipe = '';
        } else if (thisPipe.length > 1 && pipeExclude[thisPipe.charAt(0)] == thisPipe.charAt(thisPipe.length - 1)){
            thisPipe = '';
        }
        if (sortedLoop[i][1] != sortedLoop[parseInt(i)+1][1] - 1){
            if (pipes % 2 == 1){
                // console.log(pipes + ' pipes. ' + sortedLoop[i] + ' to ' + sortedLoop[parseInt(i)+1] + ' = ' + (sortedLoop[parseInt(i)+1][1] - sortedLoop[i][1] - 1));
                inside += sortedLoop[parseInt(i)+1][1] - sortedLoop[i][1] - 1;
            }
        }
    } else {
        pipes = 0;
        thisPipe = '';
    }
}
console.log(inside);