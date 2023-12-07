const useExample = false; // if false, uses input.txt
const exampleToUse = 2; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n');

// Part 2

const tiers = [[],[],[],[],[],[],[]];

for (let i of input){
    let thisHand = i.split(' ');
    const convertedHand = thisHand[0].replace(/A/g,'E').replace(/K/g,'D').replace(/Q/g,'C').replace(/J/g,'0').replace(/T/g,'A');
    const bid = thisHand[1];

    const repeat = /(.)\1+/g;
    const preHand = thisHand[0].split("").sort().join('');
    const preMatch = preHand.match(repeat);
    let sortedHand;
    if (preHand.indexOf('J') == -1 || preHand == "JJJJJ") {
        sortedHand = preHand;
    } else if (preMatch == null){
        sortedHand = "AABCD";
    } else if (preMatch[0].length == 4 || preMatch[0].length == 5){
        sortedHand = "AAAAA";
    } else if (preMatch.length == 2 && (preMatch[0].length == 3 || preMatch[1].length == 3)){
        sortedHand = "AAAAA";
    } else if (preMatch[0].length == 3){
        if (preMatch[0] == "JJJ"){
            sortedHand = "AAAAB";
        } else {
            sortedHand = "AAAAB";
        }
    } else if (preMatch.length == 2){
        if (preMatch[0] == "JJ" || preMatch[1] == "JJ"){
            sortedHand = "BBBBC";
        } else {
            sortedHand = "AABBB";
        }
    } else if (preMatch[0].length == 2){
        if (preMatch[0] == "JJ"){
            sortedHand = "BBBCD";
        } else {
            sortedHand = "AAABC";
        }
    } else {
        sortedHand = preHand;
    }
    
    const kinds = sortedHand.match(repeat);

    let tier = 0, description;
    if  (kinds == null){
        description = 'highcard';
        tier = 0;
    } else if (kinds[0].length == 5){
        description = '5kind';
        tier = 6;
    } else if (kinds[0].length == 4){
        description = '4kind';
        tier = 5;
    } else if (kinds.length == 2 && (kinds[0].length == 3 || kinds[1].length == 3)){
        description = 'fullhouse';
        tier = 4;
    } else if (kinds[0].length == 3){
        description = '3kind';
        tier = 3;
    } else if (kinds.length == 2){
        description = 'twopair';
        tier = 2;
    } else if (kinds[0].length == 2){
        description = '2kind';
        tier = 1;
    }
    
    tiers[tier].push({
        hand: convertedHand,
        bid: bid,
        what: description,
        sorted: sortedHand,
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