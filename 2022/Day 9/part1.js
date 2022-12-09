const day = 9;
const use_example = false;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
var h = {'x':0, 'y':0};
var t = {'x':0, 'y':0};
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
    // console.log(row);
    for (var i = 0; i < parseInt(instruction[1]); i++){
        h[compass[instruction[0]].axis] += compass[instruction[0]].move;
        if (h.y == t.y && h.x - t.x == 2) t.x += 1; // right
        else if (h.y == t.y && h.x - t.x == -2) t.x -= 1; // left
        else if (h.x == t.x && h.y - t.y == 2) t.y += 1; // up
        else if (h.x == t.x && h.y - t.y == -2) t.y -= 1; // down
        else if ((Math.abs(h.x - t.x) == 2 || Math.abs(h.y - t.y) == 2) && h.x > t.x && h.y > t.y) {t.x += 1; t.y += 1} //up+right
        else if ((Math.abs(h.x - t.x) == 2 || Math.abs(h.y - t.y) == 2) && h.x > t.x && h.y < t.y) {t.x += 1; t.y -= 1} //down+right
        else if ((Math.abs(h.x - t.x) == 2 || Math.abs(h.y - t.y) == 2) && h.x < t.x && h.y > t.y) {t.x -= 1; t.y += 1} //up+left
        else if ((Math.abs(h.x - t.x) == 2 || Math.abs(h.y - t.y) == 2) && h.x < t.x && h.y < t.y) {t.x -= 1; t.y -= 1} //down+left

        if (!touched.includes(t.x + '.' + t.y)) touched.push(t.x + '.' + t.y);
        // console.log('h:' + h.x + '.' + h.y + ' t:' + t.x + '.' + t.y);
    }
})

console.log(touched.length);