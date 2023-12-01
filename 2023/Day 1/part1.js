const day = 1;
const use_example = false;

const filename = '2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

//part 1
let total = 0;
for (let i in input_array){
    let regex = /\d/g;
   let matches = input_array[i].match(regex);
   total += parseInt('' + matches[0] + matches[matches.length-1]);
}
console.log(total);