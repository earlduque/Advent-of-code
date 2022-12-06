const filename = '2022/Day 6/input.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
function findIt(length){
    let current;
    for (var i in input){
        if (i < length - 1) continue;
        current = input.substring(i-length,i);
        if (new Set(current).size == current.length) {
            console.log(parseInt(i));
            break;
        }
    }
}
findIt(4);

//part 2
findIt(14);