const day = 1;
const use_example = true;

const filename = '2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

//part 1
for (let i in input_array){
    
}