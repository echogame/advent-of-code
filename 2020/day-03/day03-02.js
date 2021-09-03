// https://adventofcode.com/2020/day/3#part2
// Like before, we are given a map with spaces and trees
// This time, there are multiple ways to move (see MOVEMENTS variable)
// Find the # of trees each movement type hits, and multiply them together.

const {SAMPLE_MAP, mapData} = require('./input');

// Steps through map top to bottom (H+3, V+1) & counts how many # we hit using the given map
function howManyTrees({map = [], width = 0}, horizontalIncrease = 3, verticalIncrease = 1) {
  // console.log(map, width, map.length);
  let treeCount = 0;
  let posHorizontal = 0;
  let posVertical = 0;

  while (posVertical < map.length) {
    // console.log('x:', posHorizontal, ', y: ', posVertical)
    let row = map[posVertical];
    if (row[posHorizontal % width] === '#') {
      treeCount++;
    }

    posHorizontal += horizontalIncrease;
    posVertical += verticalIncrease;
  };

  return treeCount;
}

// Returns an array of objects where the key is the position of each '#'
function organizeMapData(mapArray) {
  let map = [];

  mapArray.forEach(mapRow => {
    const rowInfo = {};

    for (let i = 0; i < mapRow.length; i++) {
      if (mapRow[i] === '#') {
        rowInfo[i] = '#';
      }
    }

    map.push(rowInfo);
  });

  return {
    map,
    width: mapArray[0].length || 0
  };
}

// Check old version to make sure it works
// console.log(howManyTrees(organizeMapData(SAMPLE_MAP))); // Expect 7

// Given different movements, gather their results & multiply them together
const MOVEMENTS = [
  {
    right: 1, 
    down: 1
  },
  {
    right: 3, 
    down: 1
  },
  {
    right: 5, 
    down: 1
  },
  {
    right: 7, 
    down: 1
  },
  {
    right: 1, 
    down: 2
  }
]

const results = MOVEMENTS.map(movement => {
  return howManyTrees(organizeMapData(mapData), movement.right, movement.down);
});
const reducer = (acc, currValue) => {
  return acc * currValue;
};

console.log(results.reduce(reducer));
