const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n');

// Part 1

const valid = [];
const reValid = /[^\d\.]/g

for (let i in input){
    let row = [];
    let current = input[i].replace(/\r/,'')
    while ((match = reValid.exec(current)) != null){
        row.push('z' + match.index);
    }
    valid.push(row);
}
// console.log(valid);
/*
[
  [],       
  [ 3 ],
  [],       
  [ 6 ],
  [ 3 ],    
  [ 5 ],
  [],       
  [],
  [ 3, 5 ], 
  []
]
*/

const reNumber = /\d+/g;

let hits = [];

for (let i in input){
    let current = input[i].replace(/\r/,'');
    while ((match = reNumber.exec(current)) != null){
        /*
        [ '467', index: 0, input: '467..114..', groups: undefined ]
        [ '114', index: 5, input: '467..114..', groups: undefined ]
        [ '35', index: 2, input: '..35..633.', groups: undefined ]
        [ '633', index: 6, input: '..35..633.', groups: undefined ]
        [ '617', index: 0, input: '617*......', groups: undefined ]
        [ '58', index: 7, input: '.....+.58.', groups: undefined ]
        [ '592', index: 2, input: '..592.....', groups: undefined ]
        [ '755', index: 6, input: '......755.', groups: undefined ]
        [ '664', index: 1, input: '.664.598..', groups: undefined ]
        [ '598', index: 5, input: '.664.598..', groups: undefined ]
        */
       const hit = {
        value: parseInt(match[0]),
        length: match[0].length,
        row: parseInt(i),
        start: match.index,
        end: match.index + match[0].length - 1,
        last: current.length - 1,
       }
       hits.push(hit);
    }
}

let total = 0;
for (let hit of hits){
    let add = false;
    if (hit.row > 0){
        if (hit.start > 0){
            if (valid[hit.row - 1].indexOf('z'+(hit.start - 1)) != -1){ //check top left
                add = true;
            }
        }
        if (hit.end <= hit.last){
            if (valid[hit.row - 1].indexOf('z'+(hit.end + 1)) != -1) { //check top right
                add = true;
            }
        }
        for (let i = hit.start; i <= hit.end; i++){
            if (valid[hit.row - 1].indexOf('z'+ i) != -1) { //check all above
                add = true;
            }
        }
    }
    if (hit.row < valid.length - 1) {
        if (hit.start > 0){
            if (valid[hit.row + 1].indexOf('z'+(hit.start - 1)) != -1){ //check bottom left
                add = true;
            }
        }
        if (hit.end <= hit.last){
            if (valid[hit.row + 1].indexOf('z'+(hit.end + 1)) != -1) { //check bottom right
                add = true;
            }
        }
        for (let i = hit.start; i <= hit.end; i++){
            if (valid[hit.row + 1].indexOf('z'+ i) != -1) { //check all below
                add = true;
            }
        }
    }
    if (hit.start > 0) {
        if (valid[hit.row].indexOf('z'+(hit.start - 1)) != -1){ //check left
            add = true;
        }
    }
    if (hit.end < hit.last){
        if (valid[hit.row].indexOf('z'+(hit.end + 1)) != -1){ //check right
            add = true;
        }
    }
    if (add) {
        // console.log(hit)
        total += hit.value;
    }
}

console.log(total);