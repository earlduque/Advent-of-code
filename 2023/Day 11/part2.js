const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

// Part 2

const yJumps = [];

for (let i in input){
    if (input[i].indexOf('#') == -1){
        yJumps.push(i);
    }
}

function vertical(strings) {
    const arr = [];
    const stringLength = strings[0].length;

    for (let i = 0; i < stringLength; i++) {
        let charString = '';
        for (let string of strings) {
            charString += string[i];
        }
        arr.push(charString);
    }
    return arr;
}

const vInput = vertical(input);
const xJumps = [];
for (let i in vInput){
    if (vInput[i].indexOf('#') == -1){
        xJumps.push(parseInt(i));
    }
}

let coordinates = [];
for (let i in input){
    for (let j in input[i]){
        if (input[i].charAt(j) == "#"){
            coordinates.push([parseInt(i),parseInt(j)]);
        }
    }
}

let bigDistance = 1000000-1;

function countNumbersInRange(array, bound1, bound2) {
    const lowerBound = Math.min(bound1, bound2);
    const upperBound = Math.max(bound1, bound2);
    let count = 0;
    for (let number of array) {
        if (number > lowerBound && number < upperBound) {
            count++;
        }
    }
    return count;
}

function manhattanDistance(coord1, coord2, extraX, extraY) {
    const xDistance = Math.abs(coord1[0] - coord2[0]) + extraX;
    const yDistance = Math.abs(coord1[1] - coord2[1]) + extraY;
    return xDistance + yDistance;
}

let total = 0;

for (let i = 0; i < coordinates.length; i++){
    for (let j = i + 1; j < coordinates.length; j++){
        const thisXJump = countNumbersInRange(xJumps, parseInt(coordinates[j][1]), parseInt(coordinates[i][1])) * bigDistance;
        const thisYJump = countNumbersInRange(yJumps, parseInt(coordinates[j][0]), parseInt(coordinates[i][0])) * bigDistance;
        // console.log((i+1) + ' and ' + (j+1) + ' (' + thisYJump + ' + ' + thisXJump + ') + ('+ coordinates[j][0] + '-' + coordinates[i][0] + ') + (' + coordinates[j][1] + '-' + coordinates[i][1]+ ') = ' + (manhattanDistance(coordinates[i], coordinates[j], thisXJump, thisYJump)));
        total +=  manhattanDistance(coordinates[i], coordinates[j], thisXJump, thisYJump);
    }
}

console.log(total)