// https://adventofcode.com/2020/day/5
// Given a string that encodes seat information of a plane
// Where the row & col strings are represented by binary space partitioning
// - out of rows 0-127, 7 letters of F/B for front/back to find row
// - out of seats/column 0-7, 3 letters representing L/R for left/right to find col
// and seat ID is (row * 8 + column):
// What is max possible seatID of this input list?

const { SAMPLE_DATA, inputData } = require('./input.js');
const MAX_ROW = 127, MAX_COL = 7;

function formatBatchString(inputString) {
  return inputString.split(`\n`);
}

// Given a string with 7 letters of row and 3 letters of column,
// decode into what row, column, and seat ID this seatString represents.
// Uses findUsingBinary() to decode row and column.
function seatDecoder(seatString = "") {
  const rowString = seatString.substring(0, 7);
  const colString = seatString.substring(7, seatString.length);

  const row = findUsingBinary(0, MAX_ROW, 'F', 'B', rowString);
  const column = findUsingBinary(0, MAX_COL, 'L', 'R', colString);
  const seatId = row * 8 + column;

  return {row, column, seatId};
}

// Given a min/max number range, the two string representations of higher & lower half,
// find resulting number represented by the searchString
// ex: min 0, max 7, lowerString L, higherString R, and searchString LRR
function findUsingBinary(min, max, lowerString, higherString, searchString) {
  // base cases 
  if (min === max) {
    return min;
  }

  if (min + 1 === max) {
    if (searchString[0] == lowerString) {
      return min;
    } else {
      return max;
    }
  }

  // search for back or front ranges
  const half = Math.floor((max - min)/2);
  if (searchString[0] == lowerString) {
    return findUsingBinary(min, min + half, lowerString, higherString, searchString.substring(1, searchString.length));
  }

  return findUsingBinary(min + half, max, lowerString, higherString, searchString.substring(1, searchString.length));
}

// Find the highest occurring seat ID
function findMaxSeatId(seatsArray = []) {
  let maxSeatId = -1;

  seatsArray.forEach(seatString => {
    const seatInfoObject = seatDecoder(seatString);
    if (maxSeatId < seatInfoObject.seatId) {
      maxSeatId = seatInfoObject.seatId;
    }
  });

  return maxSeatId;
}

// Test sample cases
for (seatStringKey in SAMPLE_DATA) {
  console.log('A: ', seatDecoder(seatStringKey), '\nE: ', SAMPLE_DATA[seatStringKey])
}

// Find solution
console.log(findMaxSeatId(formatBatchString(inputData)))