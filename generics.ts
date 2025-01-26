/**
 * =========================================
 * TypeScript Generics (ジェネリクス) のサンプル
 * =========================================
 *
 * まとめて1ファイルに記載しています。
 * セクションごとにたくさんのコード例を置いてあるので、
 * 実際にコンパイル・実行しながら確認してみてください。
 */

/* =========================================
 * 1. ジェネリクスの基本
 * ========================================= */

/**
 * 1-1. 型パラメータを使ったシンプルな関数
 */
function identity<T>(value: T): T {
  // valueの型をTとして受け取り、そのまま返す
  return value;
}

// 関数呼び出し時に型を指定する例
const num = identity<number>(10); // number型として使う
const str = identity<string>("Hello TypeScript"); // string型として使う

// 型推論を使った呼び出し例
const bool = identity(true); // T が boolean として推論される

/**
 * 1-2. 複数の型パラメータ
 */
// T, Uという2つの型パラメータを使う例
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  // 戻り値は T と U の交差型(Intersection Type)になる
  return { ...obj1, ...obj2 };
}

// 使用例
const merged = mergeObjects({ name: "Alice" }, { age: 30 });
console.log(merged.name); // "Alice"
console.log(merged.age);  // 30

// 型パラメータを明示的に指定
const merged2 = mergeObjects<{ name: string }, { age: number }>(
  { name: "Bob" },
  { age: 25 }
);

/* =========================================
 * 2. ジェネリクスの制約 (Constraints)
 * ========================================= */

/**
 * 2-1. オブジェクトにキーがあることを保証する
 */
function getLength<T extends { length: number }>(item: T): number {
  // Tは必ずlengthプロパティを持つ（= 文字列や配列など）
  return item.length;
}

console.log(getLength("Hello"));      // 5
console.log(getLength([1, 2, 3, 4])); // 4
// getLength(10); // エラー (number型にはlengthがない)

/**
 * 2-2. 特定の型の部分型 (SubType) であることを保証する
 */
interface Animal3 {
  name: string;
}

interface Dog extends Animal3 {
  bark(): void;
}

interface Cat extends Animal3 {
  meow(): void;
}

// TがAnimalを継承していることを保証する
function greetAnimal<T extends Animal3>(animal: T): void {
  console.log(`Hello, ${animal.name}!`);
}

// Dogインターフェイスを使った例
const myDog: Dog = {
  name: "Pochi",
  bark: () => console.log("ワンワン！"),
};

greetAnimal(myDog); 
// greetAnimal({ brand: "Toyota" }); // エラー：Animalの構造を満たさない

/* =========================================
 * 3. ジェネリクスを用いた関数のいろいろなパターン
 * ========================================= */

/**
 * 3-1. ジェネリクスを使ったユーティリティ関数
 * 配列から最初の要素を取り出す例
 */
function firstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// 使用例
const firstNum = firstElement([10, 20, 30]); // 10
const firstStr = firstElement(["apple", "banana"]); // "apple"
console.log(firstNum, firstStr);

/**
 * 3-2. 配列の要素の最後を取得する例
 */
function lastElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

console.log(lastElement([1, 2, 3, 4]));   // 4
console.log(lastElement(["a", "b", "c"])); // "c"

/**
 * 3-3. ジェネリクスを使ってタプルを返す関数
 * パラメータを2つ受け取って、それらをタプルにして返す
 */
function makeTuple<T, U>(value1: T, value2: U): [T, U] {
  return [value1, value2];
}

const tuple1 = makeTuple<number, string>(1, "TypeScript"); 
// => [1, "TypeScript"]
const tuple2 = makeTuple("Hello", true); 
// => [string, boolean] と推論される

/**
 * 3-4. 配列をシャッフルしてランダムな順番にする関数
 */
function shuffleArray<T>(arr: T[]): T[] {
  // 元の配列をコピー
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

console.log(shuffleArray([1, 2, 3, 4, 5]));

/* =========================================
 * 4. ジェネリクスとクラス
 * ========================================= */

/**
 * 4-1. スタック (LIFO) を表す簡単なクラス
 */
class Stack<T> {
  private items: T[] = [];

  // 要素を追加する
  push(item: T): void {
    this.items.push(item);
  }

  // 最後に追加した要素を削除して返す
  pop(): T | undefined {
    return this.items.pop();
  }

  // 現在の要素数を返す
  size(): number {
    return this.items.length;
  }
}

// number型のスタックを作る
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.size()); // 2
console.log(numberStack.pop());  // 20
console.log(numberStack.pop());  // 10

// string型のスタックを作る
const stringStack = new Stack<string>();
stringStack.push("foo");
stringStack.push("bar");
console.log(stringStack.size()); // 2
console.log(stringStack.pop());  // "bar"
console.log(stringStack.pop());  // "foo"

/* =========================================
 * 5. ジェネリクスとインターフェイス
 * ========================================= */

/**
 * 5-1. ジェネリックインターフェイス
 */
// Storage を CustomStorage にリネーム
interface CustomStorage<K, V> {
  addItem(key: K, value: V): void;
  getItem(key: K): V | undefined;
}

// Stringをキー、numberを値にするストレージの実装例
class NumberStorage implements CustomStorage<string, number> {
  private store: { [key: string]: number } = {};

  addItem(key: string, value: number): void {
    this.store[key] = value;
  }

  getItem(key: string): number | undefined {
    return this.store[key];
  }
}

const numStorage = new NumberStorage();
numStorage.addItem("apple", 3);
numStorage.addItem("banana", 5);
console.log(numStorage.getItem("apple"));  // 3
console.log(numStorage.getItem("banana")); // 5

// Stringをキー、文字列を値にするストレージの実装例
class StringStorage implements CustomStorage<string, string> {
  private store: { [key: string]: string } = {};

  addItem(key: string, value: string): void {
    this.store[key] = value;
  }

  getItem(key: string): string | undefined {
    return this.store[key];
  }
}

const strStorage = new StringStorage();
strStorage.addItem("lang", "TypeScript");
console.log(strStorage.getItem("lang")); // "TypeScript"

/* =========================================
 * 6. 型推論を活かすためのテクニック
 * ========================================= */

/**
 * 6-1. オーバーロードの代わりにジェネリクスで対応
 */
function toArray<T>(value: T | T[]): T[] {
  // もし value が配列ならそのまま、そうでなければ配列に包んで返す
  return Array.isArray(value) ? value : [value];
}

// number型ひとつ => number[]に包まれる
const arr1 = toArray(123); // => [123]

// number[] => そのまま
const arr2 = toArray([1, 2, 3]); // => [1, 2, 3]

// string も同様
const arr3 = toArray("Hello");

/**
 * 6-2. 関数の戻り値を推論させる例
 */
function wrapValue<T>(value: T) {
  return { value };
}
const wrappedNumber = wrapValue(42);      // { value: number }
const wrappedString = wrapValue("Hello"); // { value: string }

/* =========================================
 * 7. Utility Types との組み合わせ
 *  - TypeScript が提供する Utility Types で
 *    ジェネリクスが使われているものを活用する例
 * ========================================= */

/**
 * 7-1. Partial<T>
 *  - T のすべてのプロパティをオプショナルにした型を作る
 */
interface User3 {
  id: number;
  name: string;
  age: number;
}

// ユーザーの一部の情報だけを更新する用の型
function updateUser(user: User3, newValues: Partial<User3>): User3 {
  return { ...user, ...newValues };
}
const user1: User3 = { id: 1, name: "Alice", age: 25 };
const updatedUser1 = updateUser(user1, { age: 26 }); 
// => { id: 1, name: "Alice", age: 26 }

/**
 * 7-2. Readonly<T>
 *  - T のすべてのプロパティを読み取り専用にした型を作る
 */
const readOnlyUser: Readonly<User3> = {
  id: 2,
  name: "Bob",
  age: 30,
};
// readOnlyUser.age = 31; // エラー: 読み取り専用

/**
 * 7-3. Record<K, T>
 *  - K をキーに、T を値とするオブジェクトの型を作る
 */
const userRecord: Record<number, User3> = {
  1: { id: 1, name: "Charlie", age: 40 },
  2: { id: 2, name: "Diana", age: 28 },
};
console.log(userRecord[1].name); // "Charlie"

/* =========================================
 * 8. ジェネリクスまとめ
 * =========================================
 *
 * - ジェネリクスは柔軟な再利用可能なコードを実現するための仕組み。
 * - 「型パラメータ T」を使って、あらゆる型を受け取れる関数・クラスを作れる。
 * - extends キーワードを用いて、T が満たすべき条件を指定(制約)できる。
 * - オブジェクト同士をマージする、配列の最初・最後を取得するなど、
 *   ジェネリクスを使うと便利なユーティリティをシンプルに書ける。
 * - 既存の型システムを壊すことなく、安全に柔軟性を拡張できる。
 *
 * ぜひ自分のプロジェクトでもジェネリクスを積極的に活用し、
 * 型の安全性と再利用性を高めてみてください！
 */
