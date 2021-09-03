// https://adventofcode.com/2020/day/6
// Groups of multiple people answer 26 yes/no questions, represented by letter.
// Sum up the total of each group's yes'd questions.

const { SAMPLE_DATA1, SAMPLE_DATA2, inputData } = require('./input.js');

// Change large batch string into array
function formatData(inputData = '') {
  return inputData.split('\n\n');
}

// Sum up count of all unique answers
function sumAnswers(inputArray = []) {
  let sum = 0;

  inputArray.forEach(groupAnswers => {
    sum += countAnswers(groupAnswers);
  });

  return sum;
}

// Count how many unique questions were answered
function countAnswers(answersString = '') {
  const answerKey = {};
  for (let i = 0; i< answersString.length; i++) {
    if ((answersString[i]) >= 'a' && answersString[i] <= 'z') {
      answerKey[answersString[i]] = answerKey[answersString[i]]+1 || 1;
    }
  }

  return Object.keys(answerKey).length;
}

console.log(sumAnswers(formatData(SAMPLE_DATA1))); // Expect 11
console.log(sumAnswers(formatData(SAMPLE_DATA2))); // Expect 6
console.log(sumAnswers(formatData(inputData))); // Solution