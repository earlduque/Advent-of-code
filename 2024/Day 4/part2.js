const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');

input = input.split('\r\n').map(x => Array.from(x));

// Part 2

const bounds = {
    top: 0,
    bottom: input.length - 1,
    left: 0,
    right: input[0].length - 1
}

let count = 0;

for (let i in input){
    if (i <= bounds.top || i >= bounds.bottom) continue;
    for (let j in input[i]){
        if (j <= bounds.left || j >= bounds.right) continue;
        if (input[i][j] == 'A'){
            if (checkX(i, j)) count++;
        }
    }
}

console.log(count);

function checkX(originI, originJ){
    if (checkDirection(parseInt(originI), parseInt(originJ))) count++;
}

function checkDirection(originI, originJ){
    let thisString1 = input[originI - 1][originJ - 1] + "A" + input[originI + 1][originJ + 1];
    let thisString2 = input[originI + 1][originJ - 1] + "A" + input[originI - 1][originJ + 1];

    if ((thisString1 == 'MAS' || thisString1 == 'SAM') && (thisString2 == 'MAS' || thisString2 == 'SAM')) return true;
    
    return false;
}