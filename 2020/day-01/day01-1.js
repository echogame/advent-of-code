// https://adventofcode.com/2020/day/1
// Find the two entries that sum to 2020 and then multiply those two numbers together.

const {data, SAMPLE_DATA} = require('./input.js')

// loop through input array
// - if number doesn't exist in the dictionary, add to dictionary
// - if (2020 - item) exists in dictionary, we found our pair
function dayOne(input) {
  const values = {};
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    let item = input[i];

    if (!values[item]) {
      values[item] = true;
    }
    if (values[2020 - item]) {
      result = item * (2020 - item);
      // console.log(item, 2020 - item, result);
      break;
    }
  }

  if (!result) {
    console.log("ERROR: No pairs found");
  }

  return result;
}

console.log('EXAMPLE: result should equal 514579: ', dayOne(SAMPLE_DATA) === 514579);
console.log('ANSWER: ', dayOne(data));