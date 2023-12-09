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

let total = 0;
for (let i in input){
    const history = input[i].split(' ').map(Number).reverse();
    const histories = [history];
    let searching = true;
    while (searching){
        const thisHistory = [];
        for (let j in histories[histories.length - 1]){
            const thisNumber = histories[histories.length - 1][parseInt(j)+1] - histories[histories.length - 1][parseInt(j)];
            if (!isNaN(thisNumber)){
                thisHistory.push(thisNumber);
            }
        }
        
        histories.push(thisHistory);
        if (thisHistory.every(item => item === 0)){
            searching = false;
        }
    }

    for (let j of histories){
        total += j[j.length - 1];
    }
}

console.log(total);