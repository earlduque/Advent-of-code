const useExample = true; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

// Part 2

let total = 0;
const memo = {};

for (let i in input){
    let springs = input[i].split(' ')[0];
    springs = [springs,springs,springs,springs,springs].join('?');
    let key = input[i].split(' ')[1];
    key = [key,key,key,key,key].join(',');
    const reKey = new RegExp('^\\.*#{' + key.split(',').join('}\\.+#{') + '}\\.*$', '')
    
    total += replaceQuestionMarks(springs, reKey);
}

// function replaceQuestionMarks(springs, regex, currentCount = 0) {
//     if (!springs.includes('?')) {
//         return regex.test(springs) ? 1 : 0;
//     }

//     const index = springs.indexOf('?');

//     const withDot = replaceQuestionMarks(springs.substring(0, index) + '.' + springs.substring(index + 1), regex, currentCount);
//     const withPound = replaceQuestionMarks(springs.substring(0, index) + '#' + springs.substring(index + 1), regex, currentCount);

//     return withDot + withPound;
// }

function replaceQuestionMarks(springs, regex) {
    if (memo[springs] !== undefined) {
        return memo[springs];
    }

    if (!springs.includes('?')) {
        return regex.test(springs) ? 1 : 0;
    }

    const index = springs.indexOf('?');

    const withDot = replaceQuestionMarks(springs.substring(0, index) + '.' + springs.substring(index + 1), regex);
    const withPound = replaceQuestionMarks(springs.substring(0, index) + '#' + springs.substring(index + 1), regex);

    memo[springs] = withDot + withPound;
    return memo[springs];
}


console.log(total);