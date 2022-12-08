const day = 7;
const use_example = false;

const filename = '2022/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
var input_array = input.split('\n');

var dirs = {'/': 0};
let current = [];
input_array.forEach((x) => {
    let command = x.split(' ');
    if (command[0] == '$' && command[1] == 'cd' && command[2] != '..'){
        current.push(command[2]);
    } else if (command[0] == '$' && command[1] == 'ls'){
        //nothing 
    } else if (command[0] == 'dir'){
        dirs[current.join(' ') + ' ' + command[1]] = 0;
    } else if (command[0] == '$' && command[1] && command[2] == '..'){
        current.pop();
    } else {
        let build = [];
        current.forEach((y) => {
            build.push(y);
            dirs[build.join(' ')] += parseInt(command[0]);
        });
    }
});

var total = 0;
for (var i in dirs){
    if (dirs[i] <= 100000) total += dirs[i];
}

console.log(total);

//part 2
const need = 70000000 - dirs['/'];
var elligible = [];
for (var j in dirs){
    if (dirs[j] > 30000000 - need) elligible.push(dirs[j]);
}
elligible.sort(function(a, b) {
    return a - b;
});
console.log(elligible[0]);