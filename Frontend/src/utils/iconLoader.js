const icons = import.meta.glob('../assets/icons/*.png', { eager: true });

const iconMap = Object.entries(icons).reduce((acc, [path, module]) => {
  const iconName = path.split('/').pop().replace('.png', '');
  acc[iconName] = module.default;
  return acc;
}, {});

console.log(iconMap);

export default iconMap;
