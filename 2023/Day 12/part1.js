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

let total = 0;

for (let i in input){
    const springs = input[i].split(' ')[0];
    const key = input[i].split(' ')[1];
    const reKey = new RegExp('^\\.*#{' + key.split(',').join('}\\.+#{') + '}\\.*$', '')
    
    const options = replaceQuestionMarks(springs);
    for (let j of options){
        if (reKey.test(j)){
            total++;
        }
    }
}

function replaceQuestionMarks(springs) {
    if (!springs.includes('?')) {
        return [springs];
    }

    const index = springs.indexOf('?');

    const withDot = replaceQuestionMarks(springs.substring(0, index) + '.' + springs.substring(index + 1));
    const withPound = replaceQuestionMarks(springs.substring(0, index) + '#' + springs.substring(index + 1));

    return withDot.concat(withPound);
}

console.log(total);