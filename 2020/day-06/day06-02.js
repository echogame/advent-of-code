// https://adventofcode.com/2020/day/6#part2
// Count how many questions were answered by all in the group
// Sum up the total of each group's count

const { SAMPLE_DATA1, SAMPLE_DATA2, inputData } = require('./input.js');

// Change large batch string into array
function formatData(inputData = '') {
  return inputData.split('\n\n');
}

// Sum up count of all groups' answers
function sumAnswers(inputArray = []) {
  let sum = 0;

  inputArray.forEach(groupAnswers => {
    sum += countAnsweredByAll(groupAnswers);
  });

  return sum;
}

// Count how many questions were yes'd by everyone?
function countAnsweredByAll(answersString = '') {
  // Each person has their answers on their own line, so length of array of
  // split answers is how many people are in the group, assuming everyone in the
  // group has answered at least one question.
  const answerArray = answersString.split('\n');

  let allAnswered = 0;
  const answerKey = {}; 

  // Loop through all questions & track # of times each question was answered
  for (let i = 0; i< answersString.length; i++) {
    if ((answersString[i]) >= 'a' && answersString[i] <= 'z') {
      answerKey[answersString[i]] = answerKey[answersString[i]]+1 || 1;
    }

    // Has everyone in the group answered this question?
    if (answerKey[answersString[i]] === answerArray.length) {
      allAnswered++;
    }
  }

  return allAnswered;
}

console.log(sumAnswers(formatData(SAMPLE_DATA1))); // Expect 6
console.log(sumAnswers(formatData(SAMPLE_DATA2))); // Expect 3
console.log(sumAnswers(formatData(inputData))); // Solution