/***************************************************
 * 1. 基本的なクラス
 ***************************************************/

// 1-1. クラス宣言とコンストラクタ、メンバー変数
class Person {
  // アクセス修飾子が省略された場合、暗黙的に public 扱い
  name: string;
  age: number;

  // constructor の引数にアクセス修飾子をつける方法もある
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // メソッド例
  greet(): void {
    console.log(`こんにちは、${this.name}です。年齢は${this.age}歳です。`);
  }
}

// 1-2. インスタンス化
const person1 = new Person("Alice", 25);
person1.greet();


/***************************************************
 * 2. 継承 (extends) とアクセス修飾子 (public, private, protected)
 ***************************************************/

// 2-1. Person を継承した Employee クラス
class Employee extends Person {
  // private プロパティ: クラス内部からのみアクセス可能
  private employeeId: number;

  // protected プロパティ: クラス自身とサブクラスでアクセス可能
  protected department: string;

  constructor(name: string, age: number, employeeId: number, department: string) {
    super(name, age);      // 親クラス(Person)のコンストラクタ呼び出し
    this.employeeId = employeeId;
    this.department = department;
  }

  // 親クラスのメソッドをオーバーライド
  greet(): void {
    // 親クラスの greet を使いたい場合は super.greet() も呼び出せる
    super.greet();
    console.log(`社員ID: ${this.employeeId} / 部署: ${this.department}`);
  }

  // private プロパティへのアクセスはクラス内のみ許可される
  private getEmployeeId(): number {
    return this.employeeId;
  }

  // public メソッドとして公開
  public showEmployeeId(): void {
    console.log(`自分のIDは ${this.getEmployeeId()} です`);
  }
}

const employee1 = new Employee("Bob", 30, 1234, "Sales");
employee1.greet();
employee1.showEmployeeId();
// employee1.employeeId;  // private プロパティなのでコンパイルエラーになる
// employee1.getEmployeeId();  // private メソッドなのでコンパイルエラー


/***************************************************
 * 3. 抽象クラス (abstract)
 ***************************************************/

// 抽象クラスは直接インスタンス化できないが、
// 継承先で共通機能を提供したいときに使う
abstract class Animal {
  // 抽象メソッド: 実装は継承先に任せる
  abstract makeSound(): void;

  // 通常のメソッドは定義可能
  move(): void {
    console.log("移動した");
  }
}

// abstract を継承するには、抽象メソッドの実装が必要
class Dog2 extends Animal {
  makeSound(): void {
    console.log("ワンワン");
  }
}

const dog = new Dog2();
dog.makeSound(); // "ワンワン"
dog.move();      // "移動した"


/***************************************************
 * 4. インターフェースの実装 (implements)
 ***************************************************/

// 4-1. インターフェースの宣言
interface Printable {
  print(): void;
}

interface Deletable {
  delete(): void;
}

// 4-2. 複数のインターフェースを実装したクラス
class DocumentFile implements Printable, Deletable {
  constructor(public fileName: string, private content: string) {}

  print(): void {
    console.log("----- printing -----");
    console.log(`File Name: ${this.fileName}`);
    console.log(`Content: ${this.content}`);
  }

  delete(): void {
    console.log(`ファイル ${this.fileName} を削除しました。`);
  }
}

const doc = new DocumentFile("typescript_class.txt", "Classについてのサンプルです。");
doc.print();
doc.delete();


/***************************************************
 * 5. 静的メンバー (static)
 ***************************************************/

// 静的メンバーはクラスから直接アクセスできるメンバー
class MathUtil {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathUtil.PI * radius * radius;
  }
}

console.log("円の面積:", MathUtil.circleArea(5)); // "円の面積: 78.53975"


/***************************************************
 * 6. ジェネリクスを使ったクラス
 ***************************************************/

// ジェネリクスクラスは、型をパラメータとして受け取れる
class Box<T> {
  // T という型の中身を持つ box
  private _contents: T;

  constructor(value: T) {
    this._contents = value;
  }

  get contents(): T {
    return this._contents;
  }
}

const stringBox = new Box<string>("TypeScript");
const numberBox = new Box<number>(123);
console.log("stringBox:", stringBox.contents);
console.log("numberBox:", numberBox.contents);


/***************************************************
 * 7. リテラル型・ユニオン型など、他の TypeScript 機能をメソッド内で利用
 ***************************************************/

// データ状態を示すユニオン型
type Status = "active" | "inactive";

class User2 {
  constructor(public name: string, public status: Status) {}

  setStatus(newStatus: Status): void {
    this.status = newStatus;
  }

  printInfo(): void {
    console.log(`User: ${this.name}, Status: ${this.status}`);
  }
}

const user = new User2("Charlie", "active");
user.printInfo();  // User: Charlie, Status: active
user.setStatus("inactive");
user.printInfo();  // User: Charlie, Status: inactive


/***************************************************
 * 8. アクセス修飾子の省略記法
 ***************************************************/

// コンストラクタの引数にアクセス修飾子をつけると、
// そのままクラスプロパティとして宣言・初期化が行われる
class Car {
  constructor(
    public brand: string,
    private model: string,
    protected year: number
  ) {}

  public info(): void {
    console.log(`ブランド: ${this.brand}, モデル: ${this.model}, 年式: ${this.year}`);
  }
}

const car1 = new Car("Toyota", "Corolla", 2020);
car1.info();


/***************************************************
 * まとめ
 * 
 * - クラスの基本
 * - 継承 (extends)
 * - アクセス修飾子 (public, private, protected)
 * - 抽象クラス (abstract)
 * - インターフェース (implements)
 * - 静的メンバー (static)
 * - ジェネリクスクラス
 * - ユニオン型など、TypeScript の様々な機能との組み合わせ
 * 
 * これらを組み合わせることで、より型安全で再利用性の高い
 * コードを書けるようになります。
 ***************************************************/
