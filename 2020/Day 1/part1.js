const day = 1;
const use_example = false;

const filename = '2020/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

//part 1
for (let i in input_array){
    for (let j in input_array){
        if (i == j) continue;
        if (parseInt(input_array[i]) + parseInt(input_array[j]) == 2020) {
            console.log(parseInt(input_array[i])*parseInt(input_array[j]));
            return;
        }
    }
}