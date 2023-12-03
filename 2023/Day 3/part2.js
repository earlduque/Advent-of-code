const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n');

// Part 2

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

let gearMap = {};
for (let i in valid){
    gearMap['z'+i] = {};
    for (let j in valid[i]){
        gearMap['z'+i][valid[i][j]] = new Set();
    }
}

// console.log(gearMap);
/*
{
  z0: {},
  z1: { z3: Set { 467, 35 } },
  z2: {},
  z3: { z6: Set { 633 } },
  z4: { z3: Set { 617 } },
  z5: { z5: Set { 592 } },
  z6: {},
  z7: {},
  z8: { z3: Set { 664 }, z5: Set { 755, 598 } },
  z9: {}
}
*/

const reNumber = /\d+/g;

let hits = [];

for (let i in input){
    let current = input[i].replace(/\r/,'');
    while ((match = reNumber.exec(current)) != null){
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

for (let hit of hits){
    let add = false;
    if (hit.row > 0){
        if (hit.start > 0){
            if (valid[hit.row - 1].indexOf('z'+(hit.start - 1)) != -1){ //check top left
                gearMap['z'+(hit.row - 1)]['z'+(hit.start - 1)].add(hit.value);
            }
        }
        if (hit.end <= hit.last){
            if (valid[hit.row - 1].indexOf('z'+(hit.end + 1)) != -1) { //check top right
                gearMap['z'+(hit.row - 1)]['z'+(hit.end + 1)].add(hit.value);
            }
        }
        for (let i = hit.start; i <= hit.end; i++){
            if (valid[hit.row - 1].indexOf('z'+ i) != -1) { //check all above
                gearMap['z'+(hit.row - 1)]['z'+ i].add(hit.value);
            }
        }
    }
    if (hit.row < valid.length - 1) {
        if (hit.start > 0){
            if (valid[hit.row + 1].indexOf('z'+(hit.start - 1)) != -1){ //check bottom left
                gearMap['z'+(hit.row + 1)]['z'+(hit.start - 1)].add(hit.value);
            }
        }
        if (hit.end <= hit.last){
            if (valid[hit.row + 1].indexOf('z'+(hit.end + 1)) != -1) { //check bottom right
                gearMap['z'+(hit.row + 1)]['z'+(hit.end + 1)].add(hit.value);
            }
        }
        for (let i = hit.start; i <= hit.end; i++){
            if (valid[hit.row + 1].indexOf('z'+ i) != -1) { //check all below
                gearMap['z'+(hit.row + 1)]['z'+ i].add(hit.value);
            }
        }
    }
    if (hit.start > 0) {
        if (valid[hit.row].indexOf('z'+(hit.start - 1)) != -1){ //check left
            gearMap['z'+hit.row]['z'+(hit.start-1)].add(hit.value);
        }
    }
    if (hit.end < hit.last){
        if (valid[hit.row].indexOf('z'+(hit.end + 1)) != -1){ //check right
            gearMap['z'+hit.row]['z'+(hit.end+1)].add(hit.value);
        }
    }
}

console.log(gearMap);

let total = 0;
for (let i in gearMap){
    for (let j in gearMap[i]){
        if (gearMap[i][j].size > 1){
            let current = 1;
            for (let value of gearMap[i][j]){
                current = current * value;
            }
            total+=current;
        }
    }
}

console.log(total);