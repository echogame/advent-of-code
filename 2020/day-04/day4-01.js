// https://adventofcode.com/2020/day/4
// Given lists of passport info which are made up of key-value pairs,
// return # of valid passports that have all of the required keys
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)

const {SAMPLE_DATA, inputData} = require('./input.js');

// Turn arrays of strings into arrays of objects b/c I'm too lazy to
// make the actual input data look right
function reformatData(dataArray = []) {
  const reformattedData = dataArray.map(dataString => {
    const splitBySpace = dataString.split(' ');
    const dataObject = {};

    splitBySpace.forEach(keyValueString => {
      const [key, value] = keyValueString.split(':');
      dataObject[key] = value;
    });

    return dataObject;
  });

  return reformattedData;
}

const REQUIRED_KEYS = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid"
];

// Go through each passport object & see if all required keys are there
function findValidPassports(passportsArray = []) {
  let validPassportCount = 0;

  passportsArray.forEach(passportObject => {
    let validKeys = 0;

    REQUIRED_KEYS.forEach(key => {
      if (passportObject[key]) {
        validKeys++;
      }
    });

    // console.log(passportObject, validKeys)

    if (validKeys === 7) {
      validPassportCount++;
    }
  });

  return validPassportCount;
}

console.log(findValidPassports(reformatData(SAMPLE_DATA))); // Expect 2
console.log(findValidPassports(reformatData(inputData)));