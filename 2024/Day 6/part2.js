const useExample = false; // if false, uses input.txt
const exampleToUse = 1; // 1 or 2

const path = __filename.split("\\"); // Change "\\" to "\/" if you're on mac
const year = path[path.length-3];
const day = path[path.length-2].split(' ')[1];
const fileName = `${year}/Day ${day}/${useExample ? "example" + exampleToUse : "input"}.txt`;

const fs = require('fs');
let input = fs.readFileSync(fileName, 'utf-8');
input = input.split('\r\n').map(x => Array.from(x));

// Part 2

const bounds = {
    top: -1,
    bottom: input.length,
    left: -1,
    right: input[0].length
}

const row = input.findIndex(r => r.includes('^'));
const col = row !== -1 ? input[row].indexOf('^') : -1;

const currentPosition = [row, col];
const originalPosition = [...currentPosition];

let direction = 'up';
const originalDirection = direction;

const directions = {
    up: {
        move: [-1, 0],
        turn: 'right',
        bounds: bounds.top,
        check: 0,
    },
    down: {
        move: [1, 0],
        turn: 'left',
        bounds: bounds.bottom,
        check: 0,
    },
    left: {
        move: [0, -1],
        turn: 'up',
        bounds: bounds.left,
        check: 1,
    },
    right: {
        move: [0, 1],
        turn: 'down',
        bounds: bounds.right,
        check: 1,
    },
}

let visitedPositions = [];

// part 1's code so we only have to check positions that the robot will actually visit
while (true){
    visitedPositions.push([...currentPosition]);
    
    if (currentPosition[directions[direction].check] + directions[direction].move[directions[direction].check] == directions[direction].bounds){
        break;
    }

    if (input[currentPosition[0] + directions[direction].move[0]][currentPosition[1] + directions[direction].move[1]] == '.' || 
        input[currentPosition[0] + directions[direction].move[0]][currentPosition[1] + directions[direction].move[1]] == '^'
    ){
        currentPosition[0] = currentPosition[0] + directions[direction].move[0];
        currentPosition[1] = currentPosition[1] + directions[direction].move[1];
    } else {
        direction = directions[direction].turn;
    }
}
visitedPositions = Array.from(new Set(visitedPositions.map(pos => JSON.stringify(pos)))).map(pos => JSON.parse(pos));

let obstacles = [];

for (let position of visitedPositions){
    if (input[position[0]][position[1]] == '#' || input[position[0]][position[1]] == '^'){
        continue;
    } else {
        const obstacle = position;
        input[position[0]][position[1]] = '#';

        const visitedPositionsSimulated = new Set();

        currentPosition[0] = originalPosition[0];
        currentPosition[1] = originalPosition[1];
        direction = originalDirection;

        while (true){
            
            const currentPositionKey = `${currentPosition[0]},${currentPosition[1]},${direction}`;
            if (visitedPositionsSimulated.has(currentPositionKey)) {
                obstacles.push([...obstacle]);
                break;
            }
            visitedPositionsSimulated.add(currentPositionKey);
            
            if (currentPosition[directions[direction].check] + directions[direction].move[directions[direction].check] == directions[direction].bounds){
                break;
            }
        
            if (input[currentPosition[0] + directions[direction].move[0]][currentPosition[1] + directions[direction].move[1]] == '.' || 
                input[currentPosition[0] + directions[direction].move[0]][currentPosition[1] + directions[direction].move[1]] == '^'
            ){
                currentPosition[0] = currentPosition[0] + directions[direction].move[0];
                currentPosition[1] = currentPosition[1] + directions[direction].move[1];
            } else {
                direction = directions[direction].turn;
            }
        }
        input[position[0]][position[1]] = '.';
    }
}

console.log(`Checking ${visitedPositions.length} positions`);
console.log(obstacles.length);
