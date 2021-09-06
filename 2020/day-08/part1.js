const { SAMPLE_INSTRUCTIONS, INSTRUCTIONS } = require('./input.js');
const { parseData } = require('./shared.js');
const MAX_OP_RUN = 1;

function runFakeAssembly(instructions, index = 0, acc = 0) {

  if (instructions.length <= index) {
    console.log('ERROR: invalid index ', index);
    return acc;
  }

  if (index < 0) {
    console.log('ERROR: invalid index < 0')
    return acc;
  }

  const currOperation = instructions[index];
  if (currOperation.runCount >= MAX_OP_RUN) {
    // console.log('ERROR: instruction run too often');
    // console.log(`Already run this operation ${currOperation.runCount}x`)
    return acc;
  }

  // console.log(`curr index: ${index}, acc ${acc}, op`, currOperation);
  currOperation.runCount++;
 
  switch (currOperation.operation) {
    case 'acc':
      return runFakeAssembly(instructions, index + 1, acc + currOperation.value)
    case 'jmp':
      return runFakeAssembly(instructions, index + currOperation.value, acc)
    case 'nop':
      return runFakeAssembly(instructions, index + 1, acc)
    default:
      console.log('ERROR: not a valid operation');
  }

  return acc;
}

function testSolution(instructionString) {
  console.log('accumulator value:', runFakeAssembly(parseData(instructionString)));
}

testSolution(SAMPLE_INSTRUCTIONS);
testSolution(INSTRUCTIONS);
