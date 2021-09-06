const { SAMPLE_RULES, RULES } = require('./input.js');
const shared = require('./shared.js');

function howManyBagVariations(bagRules, baseBag) {
  const originalParents = _findParentsWithColor(bagRules, baseBag);
  let parentColors = Object.keys(originalParents);
  let bagTypeCount = parentColors.length;
  let colorsAlreadyChecked = Object.assign({}, originalParents);

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
  const bagRules = shared.parseBagArray(shared.parseInputStringToArray(ruleString));

  const solution = howManyBagVariations(bagRules, bagToFind);

  console.log(bagToFind, 'can be in # bag types:', solution);
}

testSolution(SAMPLE_RULES, 'shiny gold');
testSolution(RULES, 'shiny gold');