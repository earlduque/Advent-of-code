const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input2"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\n');

// Part 2

const reSplit = /\s+/g;
const times = input[0].replace(/\r/g,'').split(reSplit);
const distances = input[1].replace(/\r/g,'').split(reSplit);

const wins = [];
for (let race in times){
    if (race == 0) continue;
    // console.log(times[race] + ' ' + distances[race]);
    let losses = 0;
    for (let forward = 0; forward < parseInt(times[race]); forward++){
        const timeToMove = parseInt(times[race]) - forward;
        const distance = forward * timeToMove;
        // console.log('race: ' + forward + '. ' + timeToMove + ' ' + distance);
        if (distance > distances[race]){
            break;
        } else {
            losses++;
        }
    }

    for (let backward = parseInt(times[race]); backward >= 0; backward--){
        const timeToMove = parseInt(times[race]) - backward;
        const distance = backward * timeToMove;
        if (distance > distances[race]){
            break;
        } else {
            losses++;
        }
    }
    wins.push(parseInt(times[race])+1 - losses);
}
console.log(wins.reduce((a, b) => a * b));