const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n\r\n').map((x) => x.split('\r\n'));
const rules = input[0].map((x) => x.split('|').map((x) => parseInt(x)));
const updates = input[1].map((x) => x.split(',').map((x) => parseInt(x)));

let sum = 0;

for (let update of updates){
    let looksGood = true;
    for (let page in update){
        if (!looksGood){
            break;
        }
        const relevantRules = rules.filter((x) => x.includes(update[page]));
        for (let rule of relevantRules){
            if (
                (update[page] == rule[0] && update.indexOf(rule[1]) != -1 && page > update.indexOf(rule[1])) 
                || 
                (update[page] == rule[1] && update.indexOf(rule[0]) != -1 && page < update.indexOf(rule[0])))
                {
                looksGood = false;
                break;
            }
        }
    }
    if (looksGood) sum += update[(update.length - 1) / 2];
}

console.log(sum);