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

const seeds = input[0].replace(/\r/g,'').split(': ')[1].split(' ').map(Number);
// console.log(seeds);

const reMap = /.+-to-.+:/g;
const maps = [];

let thisMap = [];
for (let i in input){
    if (i <= 1) continue;
    if (input[i].match(reMap)){
        continue;
    } else if (input[i] == '\r'){
        maps.push(thisMap);
        thisMap = [];
    } else if (i == input.length - 1){
        thisMap.push(input[i].replace(/\r/g,'').split(' ').map(Number));
        maps.push(thisMap);
    } else {
        thisMap.push(input[i].replace(/\r/g,'').split(' ').map(Number));
    }
}
// console.log(maps);

let locations = [];
for (let i in seeds){
    let source = seeds[i];
    for (let j in maps){
        source = convert(source, maps[j]);
    }
    locations.push(source);
}
// console.log(locations);

console.log(Math.min(...locations));

function convert(source, arr){ // array of destinationStart, sourceStart, length
    let found = false;
    for (let i in arr){
        if (parseInt(source) >= parseInt(arr[i][1]) && parseInt(source) < parseInt(arr[i][1]) + parseInt(arr[i][2])){
            let target = parseInt(arr[i][0] + (parseInt(source)- parseInt(arr[i][1])));
            // console.log(source + ' goes to ' + target + ': ' + parseInt(arr[i][1]) + '-' + (parseInt(arr[i][1]) + parseInt(arr[i][2]) - 1));
            return target;
        }
    }
    if (found == false){
        // console.log(source + ' goes to ' + source);
        return parseInt(source);
    }
}