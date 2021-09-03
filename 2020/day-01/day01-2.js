// https://adventofcode.com/2020/day/1#part2
// Find three numbers that sum up to 2020 and multiply them together.
// Ex: 979, 366, and 675 - Multiplying them together produces the answer, 241861950.

const {data, SAMPLE_DATA} = require('./input.js')

const numDictionary = {};
const sumDictionary = {};

// loop through array & subtract number from 2020
// - if diff isn't in sumDictionary,
//   - save this result in sum dictionary 
//   - try to find 2 numbers that can make up this number
//   - if no result found, save value as 0
function findThree(input) {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const diff = 2020 - input[i];
    const diffResult = findTwoWithSum(input, diff);

    if (sumDictionary[diffResult]) {
      // We've seen this value already; no need to check further
      continue;
    }

    if (diffResult.length) {
      // console.log(input[i], diffResult);
      result = input[i] * diffResult[0] * diffResult[1];
      break;
    }
    sumDictionary[diffResult] = true;
  }

  if (!result) {
    console.log("ERROR: No triples found");
  }

  return result;
}

function findTwoWithSum(input, sum) {
  let result = [];

  for (let i = 0; i < input.length; i++) {
    let item = input[i];

    if (!numDictionary[item]) {
      numDictionary[item] = true;
    }
    if (numDictionary[sum - item]) {
      result = [item, sum - item];
      break;
    }
  }

  return result;
}

console.log('EXAMPLE: result should equal 241861950: ', findThree(SAMPLE_DATA) === 241861950);
console.log('ANSWER: ', findThree(data));