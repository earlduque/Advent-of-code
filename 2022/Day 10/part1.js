const day = 10;
const use_example = true;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
var input_array = input.split('\n');
var cycle = [0,0];
var register = 1;

input_array.forEach((x) => {
    let instruction = x.split(' ');
        cycle.push(register);
    if (instruction[0] == 'addx'){
        register += parseInt(instruction[1]);
        cycle.push(register);
    }
})

function strength(){
    let value = 0;
    value += cycle[20] * 20;
    value += cycle[60] * 60;
    value += cycle[100] * 100;
    value += cycle[140] * 140;
    value += cycle[180] * 180;
    value += cycle[220] * 220;
    return value;
}

console.log(strength());