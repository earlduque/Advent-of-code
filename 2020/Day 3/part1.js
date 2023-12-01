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

const slope = {
    right: 3,
    down: 1
}
const width = input[0].length - 1;
const height = input.length - 1;

console.log('w'+width+'h'+height);

let currentX = 0;
let currentY = 0;

let total = 0;

while (currentY < height){
    currentX += slope.right;
    if (currentX > width) currentX = currentX - width;
    currentY += slope.down;
    if (currentY > height) return;
    if (input[currentY].charAt(currentX) === "#") {
        total++
        // console.log('tree at ' + currentX + '.' + currentY);
    };
}

console.log(total);