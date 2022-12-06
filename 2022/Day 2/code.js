const filename = '2022/Day 2/input.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
var input_lines = input.split('\n');
var matches = [];
for (var line in input_lines){
    matches.push(input_lines[line].split(' '));
}
var score = 0;
var rps_map = {
    'A': {'X': 4, 'Y': 8, 'Z': 3},
    'B': {'X': 1, 'Y': 5, 'Z': 9},
    'C': {'X': 7, 'Y': 2, 'Z': 6}
};
for (var match in matches){
    score += rps_map[matches[match][0]][matches[match][1]];
}
console.log(score);

//part 2
var real_map = {
    'A': {'X': 3, 'Y': 4, 'Z': 8},
    'B': {'X': 1, 'Y': 5, 'Z': 9},
    'C': {'X': 2, 'Y': 6, 'Z': 7}
};
var real_score = 0;
for (var match in matches){
    real_score += real_map[matches[match][0]][matches[match][1]];
}
console.log(real_score);