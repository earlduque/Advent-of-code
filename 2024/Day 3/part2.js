const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n').join();

// Part 2

let total = 0;
let index = 0;
let searching = true;

const mulRegex = /mul\((\d+),(\d+)\)/g;
const dontRegex = /don't\(\)/g;
const doRegex = /do\(\)/g;

while (index < input.length) {
    if (searching) {
        const mulMatch = mulRegex.exec(input);
        const dontMatch = dontRegex.exec(input);
        if (mulMatch && (!dontMatch || mulMatch.index < dontMatch.index)) {
            // console.log(mulMatch[0]);
            total += mul(mulMatch[1], mulMatch[2]);
            index = mulMatch.index + mulMatch[0].length;
        } else if (dontMatch) {
            searching = false;
            index = dontMatch.index + dontMatch[0].length;
        } else {
            break;
        }
    } else {
        const doMatch = doRegex.exec(input);
        if (doMatch) {
            searching = true;
            index = doMatch.index + doMatch[0].length;
        } else {
            break;
        }
    }

    mulRegex.lastIndex = index;
    dontRegex.lastIndex = index;
    doRegex.lastIndex = index;
}

console.log(total);

function mul(x, y) {
    return Number(x) * Number(y);
}