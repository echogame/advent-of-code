function parseData(dataString) {
  const instructionArray = dataString.split('\n').map(line => {
    const instructionArray = line.split(' ');

    return {
      operation: instructionArray[0],
      value: parseInt(instructionArray[1]),
      runCount: 0
    };
  });

  return instructionArray;
}

module.exports = {
  parseData
};
