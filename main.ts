// ===== 基本的な型定義とプリミティブ型の例 =====
// 文字列型の様々な定義方法
let str1: string = "Hello";                  // ダブルクォートによる文字列
let str2: string = 'World';                  // シングルクォートによる文字列
let str3: string = `Template ${str1}`;       // テンプレートリテラルによる文字列

// 数値型の様々な表現方法
let num1: number = 42;                       // 整数
let num2: number = 3.14;                     // 浮動小数点数
let num3: number = 0xff;                     // 16進数
let num4: number = 0b1010;                   // 2進数

// 真偽値型
let bool1: boolean = true;                   // 真
let bool2: boolean = false;                  // 偽

// 特殊な型
let nul: null = null;                        // null型
let undef: undefined = undefined;            // undefined型
let sym: symbol = Symbol('key');             // シンボル型
// ES2020以下のターゲットではBigIntは使用できないためコメントアウト
// let big: bigint = 100n;

// ===== 配列とタプルの定義 =====
// 配列の定義方法
let numArray1: number[] = [1, 2, 3];         // 配列型の省略記法
let numArray2: Array<number> = [4, 5, 6];    // ジェネリック記法
let strArray: string[] = ["a", "b", "c"];    // 文字列配列
let mixedArray: (string | number)[] = [1, "two", 3];  // ユニオン型を使用した混合配列

// タプルの定義
let tuple1: [string, number] = ["age", 25];              // 基本的なタプル
let tuple2: [string, number, boolean] = ["name", 30, true];  // 3要素のタプル
let tuple3: [number, ...string[]] = [1, "a", "b", "c"];     // 可変長タプル

// ===== オブジェクト型とインターフェース =====
// 基本的なユーザーデータインターフェース
interface UserData {
    id: number;                  // 必須のID
    name: string;                // 必須の名前
    email: string;               // 必須のメールアドレス
    age?: number;                // オプショナルな年齢
    readonly createdAt: Date;    // 読み取り専用の作成日時
}

// ===== 複雑なインターフェース階層 =====
// 基本エンティティインターフェース
interface Entity {
    id: number;                  // エンティティID
    createdAt: Date;             // 作成日時
    updatedAt: Date;             // 更新日時
}

// 監査可能なエンティティのインターフェース
interface Auditable {
    createdBy: string;           // 作成者
    updatedBy: string;           // 更新者
    version: number;             // バージョン番号
}

// バリデーション可能なエンティティのインターフェース
interface Validatable {
    validate(): boolean;         // バリデーションメソッド
    getErrors(): string[];       // エラー取得メソッド
}

// 基本ユーザーインターフェース
interface BaseUser extends Entity {
    username: string;            // ユーザー名
    email: string;               // メールアドレス
    passwordHash: string;        // パスワードハッシュ
}

// 管理者ユーザーインターフェース
interface AdminUser extends BaseUser, Auditable {
    permissions: string[];       // 権限リスト
    role: 'admin' | 'superadmin';  // 管理者ロール
}

// 顧客ユーザーインターフェース
interface CustomerUser extends BaseUser {
    customerType: 'regular' | 'premium' | 'vip';  // 顧客タイプ
    loyaltyPoints: number;       // ロイヤリティポイント
}

// ===== 高度なジェネリック型 =====
// リポジトリパターンのための汎用インターフェース
interface Repository<T extends Entity> {
    find(id: number): Promise<T | null>;         // 単一エンティティの検索
    findAll(): Promise<T[]>;                     // 全エンティティの取得
    save(entity: T): Promise<T>;                 // エンティティの保存
    delete(id: number): Promise<boolean>;        // エンティティの削除
    update(id: number, entity: Partial<T>): Promise<T>;  // エンティティの更新
}

// ===== 複雑な型の組み合わせ =====
// バリデーション結果を表す型
type ValidationResult<T> = {
    isValid: boolean;                        // バリデーション結果
    errors: { [K in keyof T]?: string[] };   // エラーメッセージ
    warnings?: { [K in keyof T]?: string[] }; // 警告メッセージ
};

// ===== 条件付き型とinfer =====
// Promiseの内部型を取り出す
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
// 配列の要素型を取り出す
type UnwrapArray<T> = T extends Array<infer U> ? U : T;
// 深い階層のPromiseや配列を再帰的に解決
type DeepUnwrap<T> = T extends Promise<infer U>
    ? DeepUnwrap<U>
    : T extends Array<infer U>
    ? DeepUnwrap<U>[]
    : T;

// ===== 高度なマップ型 =====
// オブジェクトを再帰的に読み取り専用にする
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object
        ? DeepReadonly<T[P]>
        : T[P];
};

// オブジェクトを再帰的にオプショナルにする
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P]>
        : T[P];
};

// オブジェクトを再帰的に必須にする
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object
        ? DeepRequired<T[P]>
        : T[P];
};

// ===== 高度なユーティリティ型 =====
// 関数プロパティの名前を抽出
type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// 非関数プロパティの名前を抽出
type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// 関数プロパティのみを抽出
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
// 非関数プロパティのみを抽出
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// ===== 状態管理のための型システム =====
// アプリケーション全体の状態を表すインターフェース
interface State {
    user: UserState;    // ユーザー関連の状態
    ui: UIState;        // UI関連の状態
    data: DataState;    // データ関連の状態
}

// ユーザー状態を表すインターフェース
interface UserState {
    currentUser: UserData | null;  // 現在のユーザー情報
    isAuthenticated: boolean;      // 認証状態
    permissions: string[];         // 権限リスト
}

// UI状態を表すインターフェース
interface UIState {
    theme: 'light' | 'dark';       // テーマ設定
    sidebar: {
        isOpen: boolean;           // サイドバーの表示状態
        width: number;             // サイドバーの幅
    };
    modal: {
        isOpen: boolean;           // モーダルの表示状態
        type: string | null;       // モーダルのタイプ
        data: unknown;             // モーダルのデータ
    };
}

// データ状態を表すインターフェース
interface DataState {
    loading: boolean;              // ローディング状態
    error: Error | null;           // エラー情報
    lastUpdated: Date | null;      // 最終更新日時
}

// ===== アクション型システム =====
// 基本アクションインターフェース
interface Action<T extends string, P = void> {
    type: T;                       // アクションタイプ
    payload: P;                    // アクションペイロード
    timestamp: number;             // タイムスタンプ
    meta?: unknown;                // メタデータ
}

// ユーザー関連アクション
type UserAction = 
    | Action<'USER_LOGIN', { username: string; password: string }>
    | Action<'USER_LOGOUT'>
    | Action<'USER_UPDATE', Partial<UserData>>;

// UI関連アクション
type UIAction =
    | Action<'TOGGLE_THEME'>
    | Action<'SET_SIDEBAR_WIDTH', number>
    | Action<'TOGGLE_MODAL', { type: string; data?: unknown }>;

// ===== 高度なイベント処理システム =====
// イベントマップインターフェース
interface EventMap {
    click: MouseEvent;                        // クリックイベント
    keypress: KeyboardEvent;                  // キー押下イベント
    load: Event;                              // ロードイベント
    error: ErrorEvent;                        // エラーイベント
    custom: CustomEvent<{ data: unknown }>;   // カスタムイベント
}

// イベントコールバック型
type EventCallback<T extends keyof EventMap> = (event: EventMap[T]) => void;

// イベントエミッタークラス
class EventEmitter {
    private listeners: Partial<{
        [K in keyof EventMap]: EventCallback<K>[];
    }> = {};

    // イベントリスナーの登録
    on<T extends keyof EventMap>(event: T, callback: EventCallback<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]?.push(callback);
    }

    // イベントの発火
    emit<T extends keyof EventMap>(event: T, data: EventMap[T]): void {
        this.listeners[event]?.forEach(callback => callback(data));
    }
}

// ===== 高度なデコレータファクトリ =====
// バリデーションデコレータファクトリ
function validate(validationFn: (value: any) => boolean) {
    return function (target: any, propertyKey: string) {
        let value: any;
        
        // ゲッター
        const getter = function() {
            return value;
        };
        
        // セッター（バリデーション付き）
        const setter = function(newVal: any) {
            if (!validationFn(newVal)) {
                throw new Error(`Validation failed for ${propertyKey}`);
            }
            value = newVal;
        };
        
        // プロパティ定義
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

// ===== 高度なジェネリッククラス =====
// キュークラス
class Queue<T> {
    private items: T[] = [];

    // 要素の追加
    enqueue(item: T): void {
        this.items.push(item);
    }

    // 要素の取り出し
    dequeue(): T | undefined {
        return this.items.shift();
    }

    // 先頭要素の参照
    peek(): T | undefined {
        return this.items[0];
    }

    // キューの長さ
    get length(): number {
        return this.items.length;
    }

    // キューが空かどうか
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// ===== 型安全なイベントバス =====
class TypedEventBus<
    EventMap extends Record<string, any>
> {
    private listeners = new Map<
        keyof EventMap,
        Set<(data: any) => void>
    >();

    // イベント購読
    subscribe<K extends keyof EventMap>(
        event: K,
        callback: (data: EventMap[K]) => void
    ): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);

        // アンサブスクライブ関数を返す
        return () => {
            this.listeners.get(event)?.delete(callback);
        };
    }

    // イベント発行
    publish<K extends keyof EventMap>(
        event: K,
        data: EventMap[K]
    ): void {
        this.listeners.get(event)?.forEach(callback => callback(data));
    }
}

// ===== APIレスポンス型 =====
interface ApiResponse<T> {
    data: T;                    // レスポンスデータ
    status: number;             // ステータスコード
    message: string;            // メッセージ
    metadata: {                 // メタデータ
        timestamp: Date;        // タイムスタンプ
        requestId: string;      // リクエストID
        pagination?: {          // ページネーション情報
            page: number;       // 現在のページ
            pageSize: number;   // ページサイズ
            totalPages: number; // 総ページ数
            totalItems: number; // 総アイテム数
        };
    };
}

// ===== APIクライアント =====
class ApiClient {
    constructor(private baseUrl: string) {}

    // GETリクエスト
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    // POSTリクエスト
    async post<T, U>(endpoint: string, data: T): Promise<ApiResponse<U>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}

// ===== 高度な型ガード =====
// UserDataの型ガード
function isUserData(value: unknown): value is UserData {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value &&
        'email' in value
    );
}

// ===== 条件付き型とユニオン型の高度な使用 =====
// プロパティ名を型に基づいて抽出
type ExtractPropertyNames<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// 文字列プロパティの抽出
type StringProperties<T> = Pick<T, ExtractPropertyNames<T, string>>;
// 数値プロパティの抽出
type NumberProperties<T> = Pick<T, ExtractPropertyNames<T, number>>;
// 真偽値プロパティの抽出
type BooleanProperties<T> = Pick<T, ExtractPropertyNames<T, boolean>>;

// ===== 再帰的なデータ構造の型定義 =====
// ツリーノードインターフェース
interface TreeNode<T> {
    value: T;                 // ノードの値
    children: TreeNode<T>[];  // 子ノード
}

// ツリークラス
class Tree<T> {
    constructor(private root: TreeNode<T>) {}

    // 深さ優先探索
    traverse(callback: (value: T) => void): void {
        const stack: TreeNode<T>[] = [this.root];
        while (stack.length > 0) {
            const node = stack.pop()!;
            callback(node.value);
            stack.push(...node.children);
        }
    }
}

// ===== 高度な型の制約 =====
// サイズを持つインターフェース
interface Sizeable {
    size: number;
}

// 印刷可能なインターフェース
interface Printable {
    print(): void;
}

// 複数のインターフェースを満たす型のみを受け入れる関数
function processItem<T extends Sizeable & Printable>(item: T): void {
    console.log(`Size: ${item.size}`);
    item.print();
}

// ===== 条件付きメソッドの型 =====
type ConditionalMethod<T> = T extends string
    ? { length: () => number }
    : T extends Array<any>
    ? { push: (item: T extends Array<infer U> ? U : never) => void }
    : { toString: () => string };

// ===== 高度なマッピング型 =====
// ゲッターメソッドの自動生成
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// セッターメソッドの自動生成
type Setters<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// ===== 型安全なイベントエミッター =====
type EventDefinition = {
    [K: string]: (...args: any[]) => void;
};

// 型安全なイベントエミッタークラス
class TypeSafeEventEmitter<T extends EventDefinition> {
    private handlers: Partial<{
        [K in keyof T]: Set<T[K]>;
    }> = {};

    // イベントハンドラーの登録
    on<K extends keyof T>(event: K, handler: T[K]): void {
        if (!this.handlers[event]) {
            this.handlers[event] = new Set();
        }
        this.handlers[event]?.add(handler);
    }

    // イベントの発火
    emit<K extends keyof T>(
        event: K,
        ...args: Parameters<T[K]>
    ): void {
        this.handlers[event]?.forEach(handler => handler(...args));
    }
}

// ===== 高度な型の合成 =====
// 再帰的にnullとundefinedを除去
type DeepNonNullable<T> = T extends object
    ? {
          [P in keyof T]: DeepNonNullable<NonNullable<T[P]>>;
      }
    : NonNullable<T>;

// 再帰的に読み取り専用を解除
type DeepMutable<T> = T extends object
    ? {
          -readonly [P in keyof T]: DeepMutable<T[P]>;
      }
    : T;

// ===== 型安全なビルダーパターン =====
class QueryBuilder<T extends Record<string, any>> {
    private conditions: Partial<T> = {};
    private sortField?: keyof T;
    private sortOrder: 'asc' | 'desc' = 'asc';
    private limitValue?: number;

    // 条件の追加
    where<K extends keyof T>(field: K, value: T[K]): this {
        this.conditions[field] = value;
        return this;
    }

    // ソート条件の設定
    sort(field: keyof T, order: 'asc' | 'desc'): this {
        this.sortField = field;
        this.sortOrder = order;
        return this;
    }

    // 制限の設定
    limit(value: number): this {
        this.limitValue = value;
        return this;
    }

    // クエリの構築
    build(): string {
        return JSON.stringify({
            conditions: this.conditions,
            sort: this.sortField ? {
                field: this.sortField,
                order: this.sortOrder
            } : undefined,
            limit: this.limitValue
        });
    }
}

// ===== 型安全な状態マシン =====
// 状態の定義
type State = 'idle' | 'loading' | 'success' | 'error';

// 状態遷移の定義
type StateTransition = {
    [K in State]: {
        to: State[];
    };
};

// 状態マシンクラス
class StateMachine {
    private currentState: State = 'idle';
    private transitions: StateTransition = {
        idle: { to: ['loading'] },
        loading: { to: ['success', 'error'] },
        success: { to: ['idle'] },
        error: { to: ['idle'] }
    };

    // 状態遷移
    transition(to: State): void {
        const allowedTransitions = this.transitions[this.currentState].to;
        if (!allowedTransitions.includes(to)) {
            throw new Error(
                `Invalid transition from ${this.currentState} to ${to}`
            );
        }
        this.currentState = to;
    }

    // 現在の状態を取得
    getState(): State {
        return this.currentState;
    }
}

// ===== エクスポート =====
// クラスとインターフェースのエクスポート
export {
    UserData,
    Repository,
    EventEmitter,
    ApiClient,
    Tree,
    QueryBuilder,
    StateMachine
};

// 型のエクスポート
export type {
    ValidationResult,
    DeepReadonly,
    EventMap,
    ApiResponse,
    TreeNode
};
