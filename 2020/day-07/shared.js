// Given string of rules, return array of rule strings
function parseInputStringToArray(inputString = "") {
  return inputString.replace(/[\.]/g, '').split('\n');
};

// Given string of rules, return object of
// - parent bags as keys
// - children bag information as object for value
// --> bag color name as key and # of bags as value
function parseBagRuleString(ruleString = "") {
  const splittedString = ruleString.split(" bags contain ");
  const parentBagColor = splittedString[0].trim();
  let childrenBagColors = {};

  // There may be no children bags
  if (splittedString[1].trim() !== 'no other bags') {
    const childrenBagColorsArray = splittedString[1].trim().split(', ').map(childrenColorString => {
      return childrenColorString.replace(/bags?/g, '').trim();
    });

    childrenBagColorsArray.forEach(bagColorString => {
      const indexOfFirstSpace = bagColorString.indexOf(' ');
      const value = parseInt(bagColorString.substring(0, indexOfFirstSpace).trim());
      const color = bagColorString.substring(indexOfFirstSpace, bagColorString.length).trim();

      childrenBagColors[color] = value;
    })
  }

  return {
    [parentBagColor]: childrenBagColors
  }
};

// Parse array of rule strings
function parseBagArray(bagArray) {
  let bagRules = {};

  bagArray.forEach(bagString => {
    Object.assign(
      bagRules,
      parseBagRuleString(bagString)
    );
  });

  return bagRules;
};

module.exports = {
  parseInputStringToArray,
  parseBagRuleString,
  parseBagArray
};