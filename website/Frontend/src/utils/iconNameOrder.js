import icons from './iconLoader';

function generateThreeRandomIconLists() {
  const iconNames = Object.keys(icons);
  const lists = { list1: [], list2: [], list3: [] };
  
  for (const listKey in lists) {
    let tempIcons = [...iconNames];
    while (tempIcons.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempIcons.length);
      const randomIcon = tempIcons[randomIndex];
      lists[listKey].push(randomIcon);
      tempIcons.splice(randomIndex, 1);
    }
  }

  return lists;
}

const iconLists = generateThreeRandomIconLists();
export default iconLists;
