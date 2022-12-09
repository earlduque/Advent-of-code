const day = 9;
const use_example = false;
const debug = false;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example2' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 2
var rope = [
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
    {'x':0, 'y':0},
];
var compass = {
    'R': {'axis': 'x', 'move': 1},
    'L': {'axis': 'x', 'move': -1},
    'U': {'axis': 'y', 'move': 1},
    'D': {'axis': 'y', 'move': -1}
}
var touched = ['0.0'];

var input_array = input.split('\n');
input_array.forEach((row) =>{
    let instruction = row.split(' ');
    if (debug) console.log(row);
    for (var i = 0; i < parseInt(instruction[1]); i++){
        rope[0][compass[instruction[0]].axis] += compass[instruction[0]].move;

        for (var knot = 0; knot < 9; knot++ ){
            if (rope[knot].y == rope[knot+1].y && rope[knot].x - rope[knot+1].x == 2) rope[knot+1].x += 1; // right
            else if (rope[knot].y == rope[knot+1].y && rope[knot].x - rope[knot+1].x == -2) rope[knot+1].x -= 1; // left
            else if (rope[knot].x == rope[knot+1].x && rope[knot].y - rope[knot+1].y == 2) rope[knot+1].y += 1; // up
            else if (rope[knot].x == rope[knot+1].x && rope[knot].y - rope[knot+1].y == -2) rope[knot+1].y -= 1; // down
            else if ((Math.abs(rope[knot].x - rope[knot+1].x) == 2 || Math.abs(rope[knot].y - rope[knot+1].y) == 2) && rope[knot].x > rope[knot+1].x && rope[knot].y > rope[knot+1].y) {rope[knot+1].x += 1; rope[knot+1].y += 1} //up+right
            else if ((Math.abs(rope[knot].x - rope[knot+1].x) == 2 || Math.abs(rope[knot].y - rope[knot+1].y) == 2) && rope[knot].x > rope[knot+1].x && rope[knot].y < rope[knot+1].y) {rope[knot+1].x += 1; rope[knot+1].y -= 1} //down+right
            else if ((Math.abs(rope[knot].x - rope[knot+1].x) == 2 || Math.abs(rope[knot].y - rope[knot+1].y) == 2) && rope[knot].x < rope[knot+1].x && rope[knot].y > rope[knot+1].y) {rope[knot+1].x -= 1; rope[knot+1].y += 1} //up+left
            else if ((Math.abs(rope[knot].x - rope[knot+1].x) == 2 || Math.abs(rope[knot].y - rope[knot+1].y) == 2) && rope[knot].x < rope[knot+1].x && rope[knot].y < rope[knot+1].y) {rope[knot+1].x -= 1; rope[knot+1].y -= 1} //down+left

            if (knot == 8){
                if (!touched.includes(rope[knot+1].x + '.' + rope[knot+1].y)) touched.push(rope[knot+1].x + '.' + rope[knot+1].y);
            }
        }
        if (debug) console.log('h:' + rope[0].x + '.' + rope[0].y + ' t:' + rope[9].x + '.' + rope[9].y);
    }
})

console.log(touched.length);