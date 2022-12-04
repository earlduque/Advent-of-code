var input = ``; //copy and paste input here

//part 1
var input_array = input.split('\n');
var pairs = [];
input_array.forEach((x) => {pairs.push(x.split(','))});
for (var i in pairs){
    let pair = pairs[i];
    pairs[i] = [pair[0].split('-'), pair[1].split('-')];
}

var fully_contained = 0;

pairs.forEach((x) => {
    let [a,b,c,d] = [parseInt(x[0][0]), parseInt(x[0][1]), parseInt(x[1][0]), parseInt(x[1][1])];
    if ((c >= a && d <= b) || 
        (a >= c && b <= d)) fully_contained++;
});

console.log(fully_contained);

//part2
var overlap = 0;

pairs.forEach((x) => {
    let [a,b,c,d] = [parseInt(x[0][0]), parseInt(x[0][1]), parseInt(x[1][0]), parseInt(x[1][1])];
    if ((a >= c && a <= d) ||
        (b >= c && b <= d) ||
        (c >= a && c <= b) ||
        (d >= a && d <= b)) overlap++;
});

console.log(overlap);