import originalIconLists from './iconNameOrder'

// Function to split the three lists into six
function splitIconLists(iconLists) {
  const result = {};

  for (const listName in iconLists) {
    const list = iconLists[listName];
    const half = Math.ceil(list.length / 2);
    
    result[`${listName}a`] = list.slice(0, half);
    result[`${listName}b`] = list.slice(half);
  }

  return result;
}

// Split the initial lists into six
const splitLists = splitIconLists(originalIconLists);

export default splitLists;