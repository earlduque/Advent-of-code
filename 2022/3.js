var input = ``; //copy and paste input here

//part 1
var input_array = input.split('\n');
var sacks = [];
for (var i in input_array){
    var sl = input_array[i].length/2;
    sacks.push([input_array[i].substring(0,sl), input_array[i].substring(sl)])
}

var values = [];
for (var sack in sacks){
    var found = false;
    for (var j in sacks[sack][0]){
        for (var k in sacks[sack][1]){
            if (sacks[sack][0][j] === sacks[sack][1][k]){
                values.push(sacks[sack][0][j]);
                found = true;
                break;
            }
        }
        if (found) break;
    }
}

var total = charCodes(values);

function charCodes(values){
    var this_total = 0;
    for (var value in values){
        if (values[value].toUpperCase() === values[value]){
            this_total += values[value].charCodeAt(0)-38;
        } else {
            this_total += values[value].charCodeAt(0)-96;
        }
    }
    return this_total;
}

console.log(total);

//part 2
var real_values = [];
var elf = 1;
var good_list = [];
var good_list2 = [];
for (var i in input_array){
    if (elf == 1) {
        for (var j in input_array[i]){
            good_list.push(input_array[i][j]);
        }
        elf++;
    } else if (elf == 2){
        elf++;
        for (var j in input_array[i]){
            if (good_list.indexOf(input_array[i][j]) > -1){
                good_list2.push(input_array[i][j]);
            }
        }
    } else if (elf == 3){
        elf = 1;
        var found = false;
        for (var j in input_array[i]){
            if (good_list2.indexOf(input_array[i][j]) > -1){
                real_values.push(input_array[i][j]);
                break;
            }
            if (found) break;
        }
        good_list = [];
        good_list2 = [];
    }
}

var real_total = charCodes(real_values);

console.log(real_total);