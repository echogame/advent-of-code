const {SAMPLE_DATA, passwords} = require('./input.js');

function howManyValidV2(passwordsList = []) {
  let validCount = 0;

  passwordsList.forEach(passwordData => {
    const [indexes, letter, passwordString] = passwordData.split(' ');
    const [lowerIndex, upperIndex] = indexes.split('-');

    if (passwordString[lowerIndex-1] !== passwordString[upperIndex-1]
      && (passwordString[lowerIndex-1] === letter[0]
        || passwordString[upperIndex-1] === letter[0])) {
      validCount++;
    }

  });

  return validCount;
}

console.log(howManyValidV2(SAMPLE_DATA)); // Expect 1
console.log(howManyValidV2(passwords)); 