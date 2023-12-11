const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

// Part 1

let galaxy = [];

for (let i of input){
    if (i.indexOf('#') != -1){
        galaxy.push(i);
    } else {
        galaxy.push(i);
        galaxy.push(i);
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
const verts = [];
let offset = 0;
for (let i in vInput){
    if (vInput[i].indexOf('#') == -1){
        verts.push(parseInt(i) + offset);
        offset++;
    }
}

function insertCharacter(strings, character, indices) {
    return strings.map(str => {
        let newStr = str;
        indices.forEach(index => {
            newStr = newStr.slice(0, index) + character + newStr.slice(index);
        });
        return newStr;
    });
}

galaxy = insertCharacter(galaxy, ".", verts);

let coordinates = [];
for (let i in galaxy){
    for (let j in galaxy[i]){
        if (galaxy[i].charAt(j) == "#"){
            coordinates.push([parseInt(i),parseInt(j)]);
        }
    }
}

let total = 0;

for (let i = 0; i < coordinates.length; i++){
    for (let j = i + 1; j < coordinates.length; j++){
        // console.log((i+1) + ' and ' + (j+1) + ' (' + coordinates[j][0] + '-' + coordinates[i][0] + ') + (' + coordinates[j][1] + '-' + coordinates[i][1]+ ') = ' + ((parseInt(coordinates[j][0]) - parseInt(coordinates[i][0])) + (parseInt(coordinates[j][1]) - parseInt(coordinates[i][1]))));
        total += Math.abs(parseInt(coordinates[j][0]) - parseInt(coordinates[i][0])) + Math.abs(parseInt(coordinates[j][1]) - parseInt(coordinates[i][1]));
    }
}

console.log(total)