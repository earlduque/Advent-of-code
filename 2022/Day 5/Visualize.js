const crates = [
    ["T","P","Z","C","S","L","Q","N"],
    ["L","P","T","V","H","C","G"],
    ["D","C","Z","F"],
    ["G","W","T","D","L","M","V","C"],
    ["P","W","C"],
    ["P","F","J","D","C","T","S","Z"],
    ["V","W","G","B","D"],
    ["N","J","S","Q","H","W"],
    ["R","C","Q","F","S","L","V"]
];
var crates1 = JSON.parse(JSON.stringify(crates)),
    crates2 = JSON.parse(JSON.stringify(crates));

const filename = '2022/Day 5/input.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part1

var instructions = [];
var input_array = input.split('\n');
input_array.forEach((x) => {
    var line = x.split(' ');
    instructions.push([line[1],line[3],line[5]]);
});

instructions.forEach((x) => {
    for (var i = 0; i < x[0]; i++){
        moveCrate(x[1], x[2]);
    }
});

function moveCrate(x, y){
    let crate_value = crates1[x-1][crates1[x-1].length - 1];
    crates1[x-1].pop();
    crates1[y-1].push(crate_value);
    crates1.forEach((x)=>{
        console.log('["' + x.join('","')+'"]');
    })
    console.log(' ');
}