function updateUncoveredRanges(uncoveredRanges, subRanges) {
    if (subRanges.length === 0) {
        // Base case: no more sub-ranges to process
        return uncoveredRanges;
    }

    let newSubRange = subRanges[0];
    let updatedRanges = [];

    for (let range of uncoveredRanges) {
        if (newSubRange[1] < range[0] || newSubRange[0] > range[1]) {
            // No overlap with the current sub-range
            updatedRanges.push(range);
        } else {
            // Handle overlap
            if (newSubRange[0] > range[0]) {
                updatedRanges.push([range[0], newSubRange[0] - 1]);
            }
            if (newSubRange[1] < range[1]) {
                updatedRanges.push([newSubRange[1] + 1, range[1]]);
            }
        }
    }

    // Recursively process the remaining sub-ranges
    return updateUncoveredRanges(updatedRanges, subRanges.slice(1));
}

// Example usage
const originalRange = [1, 20];
const subRanges = [[1, 7], [8,10], [4, 5]];
let x = updateUncoveredRanges([originalRange], subRanges); // Expected output: [[1, 2], [8, 9], [16, 17], [20, 20]]
console.log(updateUncoveredRanges(x, [[1,8]])); // Expected output: [[1, 2], [8, 9], [16, 17], [20, 20]]