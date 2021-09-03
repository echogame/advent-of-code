// Given a bunch of strings about data, output number of valid passwords
// Data format: "#1-#2 $: &&&&&&&&&&"
// - #1 is the first index it can appear
// - #2 is the second index it can appear
// -- note: letter cannot appear in both 1 and 2
// -- note: there is no concept of index 0
// - $ is the letter in question
// - &&&&&&&&&& is the password string

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