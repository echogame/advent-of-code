const { SAMPLE_RULES, RULES } = require('./input.js');

// Given string of rules, return array of rule strings
function parseInputStringToArray(inputString = "") {
  return inputString.replace(/[\.]/g, '').split('\n');
}

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
}

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
}

function howManyBagVariations(bagRules, baseBag) {
  const originalParents = _findParentsWithColor(bagRules, baseBag);
  let parentColors = Object.keys(originalParents);
  let bagTypeCount = parentColors.length;
  let colorsAlreadyChecked = Object.assign({}, originalParents);

  // console.log('first colors collected to check:', parentColors);

  while (parentColors.length) {
    // Find new parent colors to check over and over until no parents left
    const newColors = {};
    parentColors.forEach(newColorToSearch => {
      const newParentColors = _findParentsWithColor(bagRules, newColorToSearch)

      Object.assign(
        newColors,
        newParentColors
      );
    });

    // Reset parent colors to check, but ignore colors we've seen
    parentColors = [];

    Object.keys(newColors).forEach(color => {
      if (!colorsAlreadyChecked[color]) {
        parentColors.push(color);
        colorsAlreadyChecked[color] = newColors[color];
      }
    });

    // console.log('new parent colors to check:', parentColors);
    bagTypeCount += parentColors.length 
  }

  return bagTypeCount;
}

function _findParentsWithColor(bagRules, childColor) {
  const parentColors = {};
  for (parentBag in bagRules) {
    if (bagRules[parentBag][childColor]) {
      parentColors[parentBag] = bagRules[parentBag][childColor];
    }
  }

  return parentColors;
}

function testSolution(ruleString, bagToFind) {
  const bagRules = parseBagArray(parseInputStringToArray(ruleString));

  // console.log(bagRules);
  const solution = howManyBagVariations(bagRules, bagToFind);

  console.log(bagToFind, 'can be in # bag types:', solution);
}

testSolution(SAMPLE_RULES, 'shiny gold');
testSolution(RULES, 'shiny gold');