// TypeScriptのMapped Types（マップ型）の基本から応用まで
// 各コード例には理解しやすいように十分なコメントを記載しています。

// ============================
// 1. Mapped Typesの基本
// ============================
// Mapped Typesは、既存の型のプロパティを変換して新しい型を作成する機能です。
// 例えば、すべてのプロパティをオプショナルにする、読み取り専用にするなどが可能です。

// 基本例：すべてのプロパティをオプショナルにする

// 元の型
type User = {
  id: number;
  name: string;
  email: string;
};

// Mapped Type: すべてのプロパティをオプショナルにする
type PartialUser = {
  [Key in keyof User]?: User[Key];
};

/*
解説：
- `keyof User`は"id" | "name" | "email"というUnion型を生成します。
- `[Key in keyof User]`はUser型の各キーをループします。
- `User[Key]`は各プロパティの型を取得します。
- `?`を付けることで、すべてのプロパティをオプショナルにします。
*/

// 使用例
const user1: PartialUser = {
  name: "John", // すべてのプロパティを提供する必要はありません
};

// ============================
// 2. TypeScriptの組み込みMapped Types
// ============================
// TypeScriptには、次のような便利な組み込み型が用意されています。
//
// | Utility Type  | 説明                             |
// |---------------|----------------------------------|
// | `Partial<T>`  | すべてのプロパティをオプショナルにする |
// | `Required<T>` | すべてのプロパティを必須にする        |
// | `Readonly<T>` | すべてのプロパティを読み取り専用にする |
// | `Record<K, T>`| 指定したキーと値の型で新しい型を作成 |

// 使用例：`Readonly<T>`
type ReadonlyUser = Readonly<User>;

// ReadonlyUser型のプロパティは変更できません
const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

// エラー: 'name'プロパティは読み取り専用のため変更できません
// readonlyUser.name = "Bob";

// ============================
// 3. プロパティの型を変換する
// ============================
// プロパティの型をすべて別の型に変換することができます。

// 例：すべてのプロパティをstring型に変換する

type UserWithStringValues = {
  [Key in keyof User]: string;
};

const userString: UserWithStringValues = {
  id: "1",
  name: "John",
  email: "john@example.com",
};

// ============================
// 4. 条件付きMapped Types
// ============================
// Mapped Types内で条件付き型を使用することで、特定の型に基づいて変換を行うことができます。

// 例：string型のプロパティのみをnumber型に変換する

type ConvertStringToNumber<T> = {
  [Key in keyof T]: T[Key] extends string ? number : T[Key];
};

// User型のプロパティのうち、string型のみをnumber型に変換

type UpdatedUser = ConvertStringToNumber<User>;

const updatedUser: UpdatedUser = {
  id: 1, // そのまま
  name: 42, // stringからnumberに変換
  email: 12345, // stringからnumberに変換
};

// ============================
// 5. 特定のプロパティを選択または除外する
// ============================
// `Pick`と`Omit`は、特定のプロパティを選択または除外するためのユーティリティ型です。

// 例：Pickを使用して特定のプロパティを選択する

type BasicUser = Pick<User, "id" | "name">;

const basicUser: BasicUser = {
  id: 1,
  name: "John",
};

// 例：Omitを使用して特定のプロパティを除外する

type UserWithoutEmail = Omit<User, "email">;

const userWithoutEmail: UserWithoutEmail = {
  id: 1,
  name: "John",
};

// ============================
// 6. ネストされたオブジェクトのオプショナル化（Deep Partial）
// ============================
// ネストされたオブジェクトのすべてのプロパティをオプショナルにするDeep Partial型を作成します。

type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends object ? DeepPartial<T[Key]> : T[Key];
};

// Profile型の例
type Profile = {
  id: number;
  details: {
    name: string;
    address: {
      city: string;
      country: string;
    };
  };
};

type PartialProfile = DeepPartial<Profile>;

const profile: PartialProfile = {
  details: {
    address: {
      city: "New York",
    },
  },
};

// ============================
// 7. プロパティを関数に変換する
// ============================
// 各プロパティをGetter関数に変換する型を作成します。

type GetterFunctions<T> = {
  [Key in keyof T]: () => T[Key];
};

type UserGetters = GetterFunctions<User>;

const userGetters: UserGetters = {
  id: () => 1,
  name: () => "John",
  email: () => "john@example.com",
};

// 使用例
console.log(userGetters.name()); // 出力: "John"

// ============================
// 8. プロパティをPromise型に変換する
// ============================

// すべてのプロパティをPromise型に変換
type Promisify<T> = {
  [Key in keyof T]: Promise<T[Key]>;
};

type UserPromises = Promisify<User>;

const userPromises: UserPromises = {
  id: Promise.resolve(1),
  name: Promise.resolve("John"),
  email: Promise.resolve("john@example.com"),
};

// ============================
// 9. オブジェクトのバリデーション用型を作成する
// ============================

// 各プロパティに対するバリデーション関数を持つ型
type Validator<T> = {
  [Key in keyof T]: (value: T[Key]) => boolean;
};

type UserValidator = Validator<User>;

const userValidator: UserValidator = {
  id: (value) => typeof value === "number" && value > 0,
  name: (value) => typeof value === "string" && value.length > 0,
  email: (value) => typeof value === "string" && value.includes("@"),
};

// 使用例
console.log(userValidator.id(1)); // true
console.log(userValidator.name("")); // false
console.log(userValidator.email("test@example.com")); // true
