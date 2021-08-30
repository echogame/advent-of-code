// Given a bunch of strings about data, output number of valid passwords
// Data format: "##-## $: &&&&&&&&&&"
// - ##-## is the range of number of times a letter can appear
// - $ is the letter in question
// - &&&&&&&&&& is the actual password
const {SAMPLE_DATA, passwords} = require('./input.js');

function howManyValid (passwordsList = []) {
  let validCount = 0;

  passwordsList.forEach(passwordData => {
    const [range, letter, passwordString] = passwordData.split(' ');
    const [lowerRange, upperRange] = range.split('-');

    let letterCount = 0;
    for (let i = 0; i < passwordString.length; i++) {
      if (passwordString[i] === letter[0]) {
        letterCount++;
      }
    }

    if (letterCount <= parseInt(upperRange) && letterCount >= parseInt(lowerRange)) {
      validCount++;
    }

  });

  return validCount;
}

console.log(howManyValid(SAMPLE_DATA)); // Expect 2
console.log(howManyValid(passwords)); 