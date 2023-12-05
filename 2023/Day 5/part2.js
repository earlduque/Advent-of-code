const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split("\n");

// Part 2

const seeds = input[0].replace(/\r/g,'').split(': ')[1].split(' ').map(Number);

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

const levelWords = {
    0: 'seed',
    1: 'soil',
    2: 'fertilizer',
    3: 'water',
    4: 'light',
    5: 'temperature',
    6: 'humidity',
    7: 'location',
}

let location;
for (let i in seeds){
    if (i % 2 == 1) continue;
    searchRange([seeds[i], seeds[parseInt(i) + 1] + seeds[i] - 1], 0);
}
console.log('Lowest location: ' + location.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

function searchRange(thisRange, level){
    console.log("|   ".repeat(level) + levelWords[level] + ': ' + thisRange[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' - ' + thisRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    if (level == 7) {
        if (location == null || (thisRange[0] < location && thisRange[0] > 0)) location = thisRange[0];
        return;
    }
    let uncoveredRanges = [[thisRange[0], thisRange[1]]];
    for (let mapLine of maps[level]){
        const mapLineStart = mapLine[1];
        const mapLineEnd = mapLine[1] + mapLine[2] - 1;
        const newStart = thisRange[0] - mapLine[1] + mapLine[0];
        const newEnd = thisRange[1] - mapLine[1] + mapLine[0];
        if (thisRange[0] > mapLineEnd || thisRange[1] < mapLineStart) {
            continue;
        }
        else {
            if (thisRange[0] >= mapLineStart && thisRange[1] <= mapLineEnd){
                // console.log("    ".repeat(level)+'route 1');
                uncoveredRanges = updateUncoveredRanges(uncoveredRanges, [[thisRange[0],thisRange[1]]]);
                searchRange([newStart, newEnd], level + 1);
            } else {
                if (thisRange[0] > mapLineStart){
                    // console.log("    ".repeat(level)+'route 2');
                    uncoveredRanges = updateUncoveredRanges(uncoveredRanges, [[thisRange[0],mapLineEnd]]);
                    searchRange([newStart, mapLine[0] + mapLine[2] - 1], level + 1);
                }
                if (thisRange[1] < mapLineEnd){
                    // console.log("    ".repeat(level)+'route 3');
                    uncoveredRanges = updateUncoveredRanges(uncoveredRanges, [[mapLineStart,thisRange[1]]]);
                    searchRange([mapLine[0], newEnd], level + 1);
                }
            }
        }
    }

    for (let uncoveredRange of uncoveredRanges){
        // console.log("    ".repeat(level)+'route 4');
        searchRange(uncoveredRange, level + 1);
    }
}

function updateUncoveredRanges(uncoveredRanges, subRanges) {
    if (subRanges.length === 0) {
        return uncoveredRanges;
    }

    let newSubRange = subRanges[0];
    let updatedRanges = [];

    for (let range of uncoveredRanges) {
        if (newSubRange[1] < range[0] || newSubRange[0] > range[1]) {
            updatedRanges.push(range);
        } else {
            if (newSubRange[0] > range[0]) {
                updatedRanges.push([range[0], newSubRange[0] - 1]);
            }
            if (newSubRange[1] < range[1]) {
                updatedRanges.push([newSubRange[1] + 1, range[1]]);
            }
        }
    }
    return updateUncoveredRanges(updatedRanges, subRanges.slice(1));
}

//19622155 wrong
//26714516 correct. why...
