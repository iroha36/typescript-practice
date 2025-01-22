// This file demonstrates useful methods for each TypeScript collection.

// 1. Array Methods
const arrayExample = [1, 2, 3, 4, 5];
console.log("Array Methods:");
console.log(arrayExample.map(x => x * 2)); // [2, 4, 6, 8, 10]
console.log(arrayExample.filter(x => x % 2 === 0)); // [2, 4]
console.log(arrayExample.reduce((acc, x) => acc + x, 0)); // 15
console.log(arrayExample.find(x => x > 3)); // 4

// 2. Set Methods
const setExample = new Set([1, 2, 3, 3, 4]);
console.log("Set Methods:");
setExample.add(5);
console.log(setExample.has(3)); // true
setExample.delete(2);
console.log(setExample); // Set { 1, 3, 4, 5 }

// 3. Map Methods
const mapExample = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log("Map Methods:");
console.log(mapExample.get("a")); // 1
mapExample.set("c", 3);
console.log(mapExample.has("b")); // true
mapExample.delete("a");
console.log(mapExample); // Map { 'b' => 2, 'c' => 3 }

// 4. WeakMap Methods
const weakMapExample = new WeakMap();
const obj1 = {};
const obj2 = {};
weakMapExample.set(obj1, "value1");
console.log("WeakMap Methods:");
console.log(weakMapExample.get(obj1)); // value1
console.log(weakMapExample.has(obj2)); // false

// 5. WeakSet Methods
const weakSetExample = new WeakSet();
const obj3 = {};
weakSetExample.add(obj3);
console.log("WeakSet Methods:");
console.log(weakSetExample.has(obj3)); // true
weakSetExample.delete(obj3);
console.log(weakSetExample.has(obj3)); // false

// 6. TypedArray Methods
const typedArrayExample = new Int16Array([10, 20, 30]);
console.log("TypedArray Methods:");
console.log(typedArrayExample.map(x => x * 2)); // Int16Array [20, 40, 60]
console.log(typedArrayExample.reduce((acc, x) => acc + x, 0)); // 60

// 7. Object Methods
const objectExample = { key1: "value1", key2: "value2" };
console.log("Object Methods:");
console.log(Object.keys(objectExample)); // ['key1', 'key2']
console.log(Object.values(objectExample)); // ['value1', 'value2']
console.log(Object.entries(objectExample)); // [['key1', 'value1'], ['key2', 'value2']]

// Summary
// Each collection type has its own methods to handle operations like iteration,
// adding, removing, or transforming elements. Choose the collection type based
// on your data structure needs.
