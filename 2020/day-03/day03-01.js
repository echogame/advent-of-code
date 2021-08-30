const {SAMPLE_MAP, mapData} = require('./input');

// Steps through map top to bottom (H+3, V+1) & counts how many # we hit using the given map
function howManyTrees({map = [], width = 0}) {
  let treeCount = 0;
  let posHorizontal = 0;
  let posVertical = 0;

  map.forEach(row => {
    if (row[posHorizontal % width] === '#') {
      treeCount++;
    }

    posHorizontal += 3;
    posVertical ++;
  });

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

console.log(howManyTrees(organizeMapData(SAMPLE_MAP))); // Expect 7
console.log(howManyTrees(organizeMapData(mapData)));