const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');

input = input.split('\r\n').map(x => Array.from(x));

// Part 1

const bounds = {
    top: 0,
    bottom: input.length - 1,
    left: 0,
    right: input[0].length - 1
}

let count = 0;

for (let i in input){
    for (let j in input[i]){
        if (input[i][j] == 'X'){
            if (checkX(i, j)) count++;
        }
    }
}

console.log(count);

function checkX(originI, originJ){
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
    
    for (const [di, dj] of directions) {
        if (checkDirection(parseInt(originI), parseInt(originJ), di, dj)) count++;
    }
}

function checkDirection(originI, originJ, iD, jD){
    let thisString = "X";
    for (let i = 1; i < 4; i++){
        const newY = originI + (i * iD);
        const newX = originJ + (i * jD);
        if (newX < bounds.left || newX > bounds.right || newY < bounds.top || newY > bounds.bottom){
            continue;
        }
        thisString += input[newY][newX];
        if (thisString == 'XMAS') return true;
    }
    return false;
}