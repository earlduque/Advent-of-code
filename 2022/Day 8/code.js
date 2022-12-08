const day = 8;
const use_example = false;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
var input_array = input.split('\n');
var coords = [];
input_array.forEach((x) => {
    coords.push(x.replace('\r','').split(''));
})

var visible = [];

//left to right
for (var y in coords){
    let current = 0;
    let edge = true;
    for (var x in coords[y]){
        if (current < coords[y][x] || edge) {
            if (!visible.includes(x + ' ' + y)) {
                visible.push(x + ' ' + y);
            }
            current = coords[y][x];
        }
        edge = false;
    }
}

//right to left
var xlength = coords[0].length;
for (var y in coords){
    let current = 0;
    let edge = true;
    for (var x = xlength - 1; x >= 0; x--){
        if (current < coords[y][x] || edge){
            if (!visible.includes(x + ' ' + y)) {
                visible.push(x + ' ' + y);
            }
            current = coords[y][x];
        }
        edge = false;
    }
}

//top to bottom
var ylength = coords.length;
for (var x = 0; x < xlength; x++){
    let current = 0;
    let edge = true;
    for (var y = 0; y < ylength; y++){
        if (current < coords[y][x] || edge){
            if (!visible.includes(x + ' ' + y)) {
                visible.push(x + ' ' + y);
            }
            current = coords[y][x];
        }
        edge = false;
    }
}

//bottom to top
for (var x = 0; x < xlength; x++){
    let current = 0;
    let edge = true;
    for (var y = ylength - 1; y >= 0; y--){
        if (current < coords[y][x] || edge){
            if (!visible.includes(x + ' ' + y)) {
                visible.push(x + ' ' + y);
            }
            current = coords[y][x];
        }
        edge = false;
    }
}

console.log(visible.length);

//part 2
var best = 0;
for (var y in coords){
    for (var x in coords[y]){
        //look right
        let current = coords[y][x];
        let right = [];
        for (var x2 = parseInt(x) + 1; x2 < xlength; x2++){
            right.push(x2 + '-' + y);
            if (current <= coords[y][x2]) break;
        }
        // console.log(x + '-' + y + ' looking right can see ' + right.length);

        //look left
        current = coords[y][x];
        let left = [];
        for (var x2 = parseInt(x) - 1; x2 >= 0; x2--){
            left.push(x2 + '-' + y);
            if (current <= coords[y][x2]) break;
        }
        // console.log(x + '-' + y + ' looking left can see ' + left.length);

        //look down
        current = coords[y][x];
        let down = [];
        for (var y2 = parseInt(y) + 1; y2 < ylength; y2++){
            down.push(x + '-' + y2);
            if (current <= coords[y2][x]) break;
        }
        // console.log(x + '-' + y + ' looking down can see ' + down.length);

        //look up
        current = coords[y][x];
        let up = [];
        for (var y2 = parseInt(y) -1; y2 >= 0; y2--){
            up.push(x + '-' + y2);
            if (current <= coords[y2][x]) break;
        }
        // console.log(x + '-' + y + ' looking up can see ' + up.length);

        let score = right.length * left.length * down.length * up.length;
        if (score > best) best = score;
    }
}

console.log(best);