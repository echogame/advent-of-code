const { SAMPLE_INSTRUCTIONS, INSTRUCTIONS } = require('./input.js');
const { parseData } = require('./shared.js');

// Run through operations
function runFakeAssembly(instructions, index = 0, acc = 0) {
  if (index >= instructions.length || index < 0) {
    return acc;
  }

  const currOperation = instructions[index];
  if (currOperation.runCount) {
    console.log('This operation is already seen.', currOperation);
    throw Error()
  }

  currOperation.runCount++;
 
  // If jmp or nop, swap and try running rest of operations w/o any more swap in the future
  // If that path fails, back out and run the existing operation
  // We cannot use the runCount property on the instructions, as it doesn't get reset properly
  // when we fail a path
  switch (currOperation.operation) {
    case 'acc':
      return runFakeAssembly(instructions, index + 1, acc + currOperation.value)
    case 'jmp':
      try {
        return runRestOfOperationsNoSwap(instructions, index + 1, acc)
      } catch {
        return runFakeAssembly(instructions, index + currOperation.value, acc)
      }
    case 'nop':
      try {
        return runRestOfOperationsNoSwap(instructions, index + currOperation.value, acc)
      } catch {
        return runFakeAssembly(instructions, index + 1, acc)
      }
    default:
      console.log('ERROR: not a valid operation');
  }

  return acc;
}

// Functions like runFakeAssembly but keep track of "seen" separately
// This way, if a "path" fails, we do not pollute our list of visited instructions
function runRestOfOperationsNoSwap(instructions, index, acc, seen = {}) {
  if (index >= instructions.length || index < 0) {
    return acc;
  }

  if (seen[index]) {
    console.log('runRestOfOperationsNoSwap: This operation is already seen.', currOperation);
    throw Error();
  }

  const currOperation = instructions[index];
  seen[index] = true;

  switch (currOperation.operation) {
    case 'acc':
      return runRestOfOperationsNoSwap(instructions, index + 1, acc + currOperation.value, seen);
    case 'jmp':
      return runRestOfOperationsNoSwap(instructions, index + currOperation.value, acc, seen);
    case 'nop':
      return runRestOfOperationsNoSwap(instructions, index + 1, acc, seen);
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
