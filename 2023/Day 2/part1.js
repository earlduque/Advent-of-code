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

const realCount = {
    red: 12,
    green: 13,
    blue: 14,
}

let answer = 0;

for (let i in input){
    const games = input[i].replace(/Game .+: /,'').replace(/\r/,'').split('; ');
    let accept = true;
    
    for (let j in games){
        const current = games[j].split(', ');

        let thisTotals = {
            red: 0,
            green: 0,
            blue: 0
        };
        for (let k in current){
            
            let check = current[k].split(' ');
            thisTotals[check[1]] += parseInt(check[0]);

            if (thisTotals.red > realCount.red || thisTotals.green > realCount.green || thisTotals.blue > realCount.blue){
                accept = false;
                break;
            }
        }
    }

    if (accept) {
        answer += parseInt(i) + 1;
    }
}
console.log(answer);