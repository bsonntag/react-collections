export function map(collection, callback) {
  const array = [];

  collection.forEach((value, key) => {
    array.push(callback(value, key));
  });

  return array;
}