// https://adventofcode.com/2020/day/4#part2
// Required fields must exist PLUS: each field has strict rules about what values are valid for automatic validation:
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:
// cid (Country ID) - ignored, missing or not.

const {
  SAMPLE_INVALID,
  SAMPLE_VALID,
  inputData
} = require('./input-unformatted');

function formatString(batchString) {
  const arrayedData = batchString.split('\n\n');

  for (let i = 0; i < arrayedData.length; i++) {
    // replaceAl() not a function in Node? Use global regexp instead
    arrayedData[i] = arrayedData[i].replace(/\n/g, ' ');
  }

  return arrayedData;
}

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

const REQUIRED_RULES = {
  byr: (input = "") => {
    // four digits; at least 1920 and at most 2002
    return input.length === 4 && input >= 1920 && input <= 2002
  },
  iyr: (input = "") => {
    // four digits; at least 2010 and at most 2020
    return input.length === 4 && input >= 2010 && input <= 2020
  },
  eyr: (input = "") => {
    // four digits; at least 2020 and at most 2030
    return input.length === 4 && input >= 2020 && input <= 2030
  },
  hgt: (input = "") => {
    // a number followed by either cm or in:
    // If cm, the number must be at least 150 and at most 193.
    // If in, the number must be at least 59 and at most 76.
    if (input.endsWith('in')) {
      return input.substring(0,input.length-2) >= 59 && input.substring(0,input.length-2) <= 76
    } else if (input.endsWith('cm')) {
      return input.substring(0,input.length-2) >= 150 && input.substring(0,input.length-2) <= 193
    } else return false;
  },
  hcl: (input = "") => {
    // a # followed by exactly six characters 0-9 or a-f
    // cast to string in case of numbers only
    return input.length && input[0] === '#' && `${input.substring(1, input.length)}`.match(/[0-9a-f]{6}/g)
  },
  ecl: (input = "") => {
    // exactly one of: amb blu brn gry grn hzl oth
    const OPTIONS = [
      "amb", 
      "blu", 
      "brn", 
      "gry", 
      "grn", 
      "hzl", 
      "oth"
    ];

    return OPTIONS.indexOf(input) > -1;
  },
  pid: (input = "") => {
    // a nine-digit number, including leading zeroes.
    return input.length === 9 && `${input}`.match(/[0-9]{9}/g);

  }
};

// Go through each passport object & see if all required keys are there
function findValidPassports(passportsArray = []) {
  let validPassportCount = 0;

  passportsArray.forEach(passportObject => {
    let validKeys = 0;

    for (const key in REQUIRED_RULES) {
      if (REQUIRED_RULES[key](passportObject[key])) {
        validKeys++;
      }
    }

    if (validKeys === 7) {
      validPassportCount++;
    }
  });

  return validPassportCount;
}

console.log(findValidPassports(reformatData(formatString(SAMPLE_INVALID)))) // Expect 0
console.log(findValidPassports(reformatData(formatString(SAMPLE_VALID)))) // Expect 4
console.log(findValidPassports(reformatData(formatString(inputData))))