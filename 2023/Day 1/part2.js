const day = 1;
const use_example = false;

const filename = '2023/Day ' + day + '/' + (use_example ? 'example2' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

//part 2
let total = 0;
let spellingMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}
for (let i in input_array){
    let reg = /one|two|three|four|five|six|seven|eight|nine|\d/g;
    let next = reg.exec(input_array[i]);
    let matches = [];
    while (next){
        matches.push(next[0]);
        reg.lastIndex = next.index + 1;
        next = reg.exec(input_array[i]);
    }
    total+= parseInt((spellingMap[matches[0]] ? spellingMap[matches[0]] : matches[0]) + '' + (spellingMap[matches[matches.length-1]] ? spellingMap[matches[matches.length-1]] : matches[matches.length-1]));
}
console.log(total);