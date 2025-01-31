import { produce, original, current, freeze, createDraft, finishDraft, enableMapSet, enablePatches, produceWithPatches, Patch } from 'immer';

// MapSetの機能を有効化
enableMapSet();
// Patchesの機能を有効化
enablePatches();

// 基本的な使用例
console.log('=== 基本的な使用例 ===');
{
    interface User {
        name: string;
        age: number;
        address: {
            city: string;
            street: string;
        };
        hobbies: string[];
    }

    const baseUser: User = {
        name: "田中太郎",
        age: 30,
        address: {
            city: "東京",
            street: "青山1-1-1"
        },
        hobbies: ["読書", "旅行"]
    };

    // produceを使用して不変の更新を行う
    const updatedUser = produce(baseUser, draft => {
        draft.age += 1;                    // プリミティブ値の更新
        draft.address.city = "大阪";       // ネストされたオブジェクトの更新
        draft.hobbies.push("料理");        // 配列の更新
    });

    console.log('Original:', baseUser);
    console.log('Updated:', updatedUser);
    console.log('Original unchanged:', baseUser !== updatedUser);
}

// カリー化された produce の使用例
console.log('\n=== カリー化された produce の使用例 ===');
{
    const addTodo = produce((draft: string[], newTodo: string) => {
        draft.push(newTodo);
    });

    const todos = ["牛乳を買う", "本を返す"];
    const newTodos = addTodo(todos, "部屋を掃除する");
    console.log('Original:', todos);
    console.log('Updated:', newTodos);
}

// パッチを使用した変更の追跡
console.log('\n=== パッチを使用した変更の追跡 ===');
{
    interface State {
        users: { id: number; name: string }[];
        settings: { theme: string };
    }

    const baseState: State = {
        users: [
            { id: 1, name: "ユーザー1" },
            { id: 2, name: "ユーザー2" }
        ],
        settings: { theme: "light" }
    };

    const [nextState, patches, inversePatches] = produceWithPatches(
        baseState,
        draft => {
            draft.users.push({ id: 3, name: "ユーザー3" });
            draft.settings.theme = "dark";
        }
    );

    console.log('Patches:', patches);
    console.log('Inverse Patches:', inversePatches);

    // パッチを適用して変更を元に戻す
    const revertedState = produce(nextState, draft => {
        inversePatches.forEach(patch => {
            const path = patch.path.join('.');
            console.log(`Reverting: ${patch.op} at ${path}`);
        });
    });
}

// オリジナルの状態へのアクセス
console.log('\n=== オリジナルの状態へのアクセス ===');
{
    interface Item {
        id: number;
        count: number;
    }

    const items: Item[] = [
        { id: 1, count: 5 },
        { id: 2, count: 3 }
    ];

    const updatedItems = produce(items, draft => {
        draft.forEach((item, index) => {
            // draftからオリジナルの値にアクセス
            const originalCount = original(item)!.count;
            item.count = originalCount * 2;

            // 現在のdraftの状態を確認
            console.log(`Current draft at ${index}:`, current(item));
        });
    });

    console.log('Updated items:', updatedItems);
}

// Map と Set の使用例
console.log('\n=== Map と Set の使用例 ===');
{
    const baseMap = new Map<string, number>([
        ["apple", 1],
        ["banana", 2]
    ]);

    const baseSet = new Set<string>(["red", "blue"]);

    const updatedMap = produce(baseMap, draft => {
        draft.set("apple", 3);
        draft.set("orange", 1);
    });

    const updatedSet = produce(baseSet, draft => {
        draft.add("green");
        draft.delete("red");
    });

    console.log('Updated Map:', Object.fromEntries(updatedMap));
    console.log('Updated Set:', Array.from(updatedSet));
}

// 自動フリーズと手動フリーズ
console.log('\n=== フリーズの使用例 ===');
{
    interface Config {
        apiUrl: string;
        timeout: number;
    }

    const config: Config = {
        apiUrl: "https://api.example.com",
        timeout: 5000
    };

    // オブジェクトを手動でフリーズ
    const frozenConfig = freeze(config);

    try {
        // @ts-ignore - エラーを発生させるために型チェックを無視
        frozenConfig.timeout = 3000;
    } catch (e) {
        console.log('Modification attempted on frozen object:', e);
    }
}

// createDraft と finishDraft の使用例
console.log('\n=== createDraft と finishDraft の使用例 ===');
{
    interface Article {
        title: string;
        content: string;
        tags: string[];
    }

    const baseArticle: Article = {
        title: "下書き記事",
        content: "これは下書きです",
        tags: ["draft"]
    };

    // 下書きを作成
    const draft = createDraft(baseArticle);
    
    // 下書きを編集
    draft.title = "公開記事";
    draft.content = "これは公開用の内容です";
    draft.tags.push("published");

    // 下書きを確定
    const finalArticle = finishDraft(draft);

    console.log('Final article:', finalArticle);
}

// 再帰的な更新とパフォーマンス最適化
console.log('\n=== 再帰的な更新とパフォーマンス最適化 ===');
{
    interface TreeNode {
        id: number;
        name: string;
        children?: TreeNode[];
    }

    const tree: TreeNode = {
        id: 1,
        name: "root",
        children: [
            {
                id: 2,
                name: "child1",
                children: [
                    { id: 4, name: "grandchild1" }
                ]
            },
            {
                id: 3,
                name: "child2"
            }
        ]
    };

    // 特定のIDのノードを見つけて更新する関数
    const updateNodeName = (nodeId: number, newName: string) => produce(tree, draft => {
        const findAndUpdate = (node: TreeNode): boolean => {
            if (node.id === nodeId) {
                node.name = newName;
                return true;
            }
            if (node.children) {
                return node.children.some(findAndUpdate);
            }
            return false;
        };
        findAndUpdate(draft);
    });

    const updatedTree = updateNodeName(4, "updated-grandchild1");
    console.log('Updated tree:', JSON.stringify(updatedTree, null, 2));
}

// エラーハンドリングとロールバック
console.log('\n=== エラーハンドリングとロールバック ===');
{
    interface BankAccount {
        id: number;
        balance: number;
        transactions: { amount: number; date: string }[];
    }

    const account: BankAccount = {
        id: 1,
        balance: 1000,
        transactions: []
    };

    try {
        const updatedAccount = produce(account, draft => {
            const amount = 2000; // 引き出し額
            if (draft.balance < amount) {
                throw new Error("残高不足");
            }
            draft.balance -= amount;
            draft.transactions.push({
                amount: -amount,
                date: new Date().toISOString()
            });
        });
        console.log('Transaction successful:', updatedAccount);
    } catch (e) {
        console.log('Transaction failed:', e);
        // オリジナルの状態は変更されていない
        console.log('Original account unchanged:', account);
    }
}

// カスタムプロデューサーの作成
console.log('\n=== カスタムプロデューサーの作成 ===');
{
    interface Todo {
        id: number;
        text: string;
        completed: boolean;
    }

    // 再利用可能なプロデューサー関数
    const toggleTodo = produce((draft: Todo) => {
        draft.completed = !draft.completed;
    });

    const addMetadata = produce((draft: Todo) => {
        (draft as any).lastModified = new Date().toISOString();
    });

    // プロデューサーを組み合わせる
    const todo: Todo = {
        id: 1,
        text: "immerを学ぶ",
        completed: false
    };

    const updatedTodo = produce(todo, draft => {
        toggleTodo(draft);
        addMetadata(draft);
    });

    console.log('Updated todo with metadata:', updatedTodo);
}
