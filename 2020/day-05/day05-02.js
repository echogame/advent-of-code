// https://adventofcode.com/2020/day/5#part2
// It's a completely full flight, so your seat should be the only missing boarding 
// pass in your list. However, there's a catch: 
// Some of the seats at the very front and back of the plane don't exist on this 
// aircraft, so they'll be missing from your list as well.

// Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 
// from yours will be in your list.

const { SAMPLE_DATA, inputData } = require('./input.js');
const MAX_ROW = 127, MAX_COL = 7;

// Build seat chart for rows 1-126
// Remove seats that are taken
// What seat(s) are left?
function buildSeatChart(min = 0, max = 127) {
  const seatsObject = {};
  for (let row = min+1; row < max; row++) {
    seatsObject[row] = {};
    for (let col = 0; col < 8; col++) {
      seatsObject[row][col] = true;
    }
  }
  return seatsObject;
}

function findEmptySeats(seatsArray) {
  // What are the first & last rows?
  const decodedSeats = seatsArray.map(seatDecoder);
  const minRow = findMinSeat(decodedSeats)['row'];
  const maxRow = findMaxSeat(decodedSeats)['row'];

  // Build the empty seat chart, ignoring 1st & last rows
  const planeSeats = buildSeatChart(minRow,maxRow);
  
  // Remove the taken seats from the chart
  decodedSeats.forEach(seatObject => {
    if (seatObject.row > minRow && seatObject.row < maxRow) {
      delete planeSeats[seatObject.row][seatObject.column];

      if (!Object.keys(planeSeats[seatObject.row]).length) {
        delete planeSeats[seatObject.row]
      }
    }
  });

  return planeSeats;
}

function convertEmptySeatsToSeatObject(emptySeatsObj = {}) {
  const rows = Object.keys(emptySeatsObj);
  const emptySeatsArray = rows.map(rowNumber => {
    const columns = Object.keys(emptySeatsObj[rowNumber]);

    for (let i = 0; i < columns.length; i++) {
      // Keys are extracted as Strings so don't forget to parse!
      return {
        row: parseInt(rowNumber),
        column: parseInt(columns[i]),
        seatId: parseInt(rowNumber) * 8 + parseInt(columns[i])
      }
    }
  });

  console.log(emptySeatsArray);
  return emptySeatsArray;
}

// Helpers
function findMaxSeat(seatsArray = []) {
  let maxSeat = { seatId: -1 };

  seatsArray.forEach(seatObject => {
    if (maxSeat.seatId < seatObject.seatId) {
      maxSeat = seatObject;
    }
  });

  return maxSeat;
}

function findMinSeat(seatsArray = []) {
  let minSeat = { seatId: Number.MAX_SAFE_INTEGER };

  seatsArray.forEach(seatObject => {
    if (minSeat.seatId > seatObject.seatId) {
      minSeat = seatObject;
    }
  });

  return minSeat;
}

// Helpers from part 1, unchanged
function formatBatchString(inputString) {
  return inputString.split(`\n`);
}

function seatDecoder(seatString = "") {
  const rowString = seatString.substring(0, 7);
  const colString = seatString.substring(7, seatString.length);

  const row = findUsingBinary(0, MAX_ROW, 'F', 'B', rowString);
  const column = findUsingBinary(0, MAX_COL, 'L', 'R', colString);
  const seatId = row * 8 + column;

  return {row, column, seatId};
}

function findUsingBinary(min = 0, max = 0, lowerString = 'L', higherString = 'R', searchString = '') {
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

// Find solution
convertEmptySeatsToSeatObject(
  findEmptySeats(
    formatBatchString(inputData)
  )
);
