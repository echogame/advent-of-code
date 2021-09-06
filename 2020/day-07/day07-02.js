const { SAMPLE_RULES, SAMPLE_RULES2, RULES } = require('./input.js');
const shared = require('./shared.js');

function howManyChildBags(bagRules, baseBag) {
  return checkChildBags(bagRules, {color: baseBag, count: 1});
}

// Collect all children bags counts and return how many of them exist given
// count total # of parent bags also
function checkChildBags(bagRules, parentBag) {
  let childBagCount = 0;

  // Grab all child bags
  const childBags = Object.keys(bagRules[parentBag.color]).map(childBagColor => {
    return {
      color: childBagColor,
      count: bagRules[parentBag.color][childBagColor]
    };
  });


  // Add to the count each childe bag plus its children*# of itself
  childBags.forEach(childBag => {
    childBagCount += childBag.count + checkChildBags(bagRules, childBag);
  });

  // Return total # of children given parent bag multiplier
  return parentBag.count * childBagCount;
}

function testSolution(ruleString, bagToFind) {
  const bagRules = shared.parseBagArray(shared.parseInputStringToArray(ruleString));

  // console.log(bagRules);
  const solution = howManyChildBags(bagRules, bagToFind);

  console.log(bagToFind, 'contains this many child bags', solution);
}

testSolution(SAMPLE_RULES, 'shiny gold'); // Expect 32
testSolution(SAMPLE_RULES2, 'shiny gold'); // Expect 126
testSolution(RULES, 'shiny gold');