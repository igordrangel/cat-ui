export function getValueByTree(object: any, strTree: string) {
  const tree = strTree.split('.');
  let value: any;
  tree.forEach((key) => {
    if (!value) {
      if (key.includes('[') && key.includes(']')) {
        const keySplited = key.split('[');
        keySplited.forEach((keyPart) => {
          if (value) {
            value = value[keyPart.replace(/]/g, '')];
          } else {
            value = object[keyPart.replace(/]/g, '')];
          }
        });
      } else {
        value = object[key];
      }
    } else {
      if (key.includes('[') && key.includes(']')) {
        const keySplited = key.split('[');
        keySplited.forEach((keyPart) => {
          value = value[keyPart.replace(/]/g, '')];
        });
      } else {
        value = value[key];
      }
    }
  });

  return value;
}
