const day = 10;
const use_example = false;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 2
var input_array = input.split('\n');
var instruction_step = 0;
var register = 1;
var message = '';
var to_add = 0;
var skip_step = false;

for (let cycle = 0; cycle < 240; cycle++){
    if (register == cycle%40 || register-1 == cycle%40 || register+1 == cycle%40){
        message += '#';
    } else {
        message += '.';
    }
    if (skip_step){
        register += to_add;
        instruction_step++;
    }
    let instruction = input_array[instruction_step].split(' ');
    if (!skip_step){
        if (instruction[0] == 'noop'){
            instruction_step++;
        } else {
            to_add = parseInt(instruction[1]);
            skip_step = true;
        }
    } else {
        skip_step = false;
    }
    if ((cycle + 1) %40 == 0) message +='\n';
}

console.log(message);