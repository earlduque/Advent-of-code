const filename = '2015/Day 2/input.txt';
const fs = require('fs');
var input = fs.readFileSync(filename, 'utf-8');

//part 1
var input_array = input.split('\n');
var dimensions = [];
input_array.forEach((x) => {
    let row = x.split('x').map(function (x) {
        return parseInt(x);
    }).sort(function(a, b) {
        return a - b;
    });
    dimensions.push(row);
});

var total = 0;
dimensions.forEach((x) => {
    total += 2*x[0]*x[1] + 2*x[0]*x[2] + 2*x[1]*x[2] + x[0]*x[1];
})

console.log(total);

//part 2
var real_total = 0;
dimensions.forEach((x) => {
    real_total += 2*x[0] + 2*x[1] + x[0]*x[1]*x[2];
})

console.log(real_total);