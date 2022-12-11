const day = 10;
const use_example = true;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 2
var input_array = input.split('\n');
var cycle = 1;
var register = 1;

for (var i = 1; i <= 240; i++){
    
}