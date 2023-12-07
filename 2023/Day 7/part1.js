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

const tiers = [[],[],[],[],[],[],[]];

for (let i of input){
    let thisHand = i.split(' ');
    const convertedHand = thisHand[0].replace(/A/g,'E').replace(/K/g,'D').replace(/Q/g,'C').replace(/J/g,'B').replace(/T/g,'A');
    const sortedHand = thisHand[0].split("").sort().join('');
    const bid = thisHand[1];
    
    const repeat = /(.)\1+/g;
    let thisValue = 0;
    const kinds = sortedHand.match(repeat);

    let tier = 0
    if  (kinds == null){
        tier = 0;
    } else if (kinds[0].length == 5){
        tier = 6;
    } else if (kinds[0].length == 4){
        tier = 5;
    } else if (kinds.length == 2 && (kinds[0].length == 3 || kinds[1].length == 3)){
        tier = 4;
    } else if (kinds[0].length == 3){
        tier = 3;
    } else if (kinds.length == 2){
        tier = 2;
    } else if (kinds[0].length == 2){
        tier = 1;
    }
    
    tiers[tier].push({
        hand: convertedHand,
        bid: bid
    })
}

// console.log(tiers);

let sorted = [0];

for (let i of tiers){
    i.sort((a, b) => {
        if (a.hand > b.hand) {
            return 1;
        } else if (a.hand < b.hand) {
            return -1;
        }
        return 0;
    });
    for (let j of i){
        sorted.push(parseInt(j.bid));
    }
}

// console.log(sorted);

let total = 0;
for (let i in sorted){
    total += i * sorted[i];
}

console.log(total);