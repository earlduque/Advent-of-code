const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split(', ');

// Part 2

let compass = {
    n: {x: 0, y:1, L: 'w', R: 'e'},
    e: {x: 1, y:0, L: 'n', R: 's'},
    w: {x: -1, y:0, L: 's', R: 'n'},
    s: {x: 0, y:-1, L: 'e', R: 'w'},
}
let current = {
    direction: 'n',
    coord: [0,0],
}
let visited = ['0x0'];

for (let i of input){
    current.direction = compass[current.direction][i[0]];
    for (let j = 0; j < parseInt(i.slice(1)); j++){
        current.coord[0] += compass[current.direction].x;
        current.coord[1] += compass[current.direction].y;
        if (visited.indexOf(current.coord[0]+'x'+current.coord[1]) == -1) visited.push(current.coord[0]+'x'+current.coord[1]);
        else {
            console.log(Math.abs(current.coord[0]) + Math.abs(current.coord[1]));
            return;
        }
    }
}