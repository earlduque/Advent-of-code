const day = 4;
const use_example = true;

const filename = '2015/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

//part 2
for (let i in input_array){
    
}