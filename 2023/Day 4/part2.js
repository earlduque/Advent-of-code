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

let cardDupes = [];
for (let card in input){
    cardDupes.push(1);
};

for (let i in input){
    for (let card = 0; card < cardDupes[i]; card++){
        const current = input[i].replace(/Card .+: /,'').replace(/\r/,'').split(' | ');
        let myNumbers = current[0].match(/.{0,3}/g).map(Number);
        let winningNumbers = current[1].match(/.{0,3}/g).map(Number);
        
        let thisScore = 0;
        for (let j = 0; j < myNumbers.length - 1; j++){
            if (winningNumbers.indexOf(myNumbers[j]) != -1){
                thisScore ++;
            }
        }
        for (let dupe = 0; dupe < thisScore; dupe++){
            cardDupes[parseInt(i)+(dupe+1)]++;
        }
    }
}

let total = 0;
for (let card of cardDupes){
    total += card;
}
console.log(total);