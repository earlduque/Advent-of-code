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
const listA = [];
const listB = [];

for (let i in input){
    const thisPair = input[i].split('   ');
    listA.push(Number(thisPair[0]));
    listB.push(Number(thisPair[1]));
}

listA.sort();
listB.sort();

// console.log(listA);
// console.log(listB);

let total = 0;

for (let i in listA){
    total += Math.abs(listB[i] - listA[i]);
}

console.log(total);