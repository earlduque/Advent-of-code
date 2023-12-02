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

let answer = 0;

for (let i in input){
    const games = input[i].replace(/Game .+: /,'').replace(/\r/,'').split('; ');
    let thisTotals = {
        red: 0,
        green: 0,
        blue: 0
    };
    for (let j in games){
        const current = games[j].split(', ');
        for (let k in current){
            
            let check = current[k].split(' ');

            if (parseInt(check[0]) > thisTotals[check[1]]){
                thisTotals[check[1]] = parseInt(check[0]);
            }
        }
    }
    const power = (thisTotals.red * thisTotals.green * thisTotals.blue);
    answer += power;
}
console.log(answer);