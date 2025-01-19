// 非同期処理の基本を学ぶためのTypeScriptコード

// 非同期処理を模倣するための関数
// これは指定した秒数後に解決されるPromiseを返します。
function delay(seconds: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (seconds > 2) {
        // 2秒を超える場合はエラーを発生させる（意図的な例）
        reject(`Delay too long: ${seconds} seconds`);
      } else {
        resolve(`Completed after ${seconds} seconds`);
      }
    }, seconds * 1000);
  });
}

// 非同期処理をPromiseチェーンで処理する例
function promiseExample(): void {
  console.log("Promise example started");
  delay(1)
    .then(result => {
      console.log(result); // 1秒後に"Completed after 1 seconds"と表示される
      return delay(2);
    })
    .then(result => {
      console.log(result); // さらに2秒後に"Completed after 2 seconds"と表示される
    })
    .catch(error => {
      console.error("Error in promiseExample:", error);
    })
    .finally(() => {
      console.log("Promise example finished");
    });
}

// 非同期処理をasync/awaitで処理する例
async function asyncAwaitExample(): Promise<void> {
  console.log("Async/Await example started");
  try {
    const result1 = await delay(1);
    console.log(result1); // 1秒後に"Completed after 1 seconds"と表示される

    const result2 = await delay(2);
    console.log(result2); // さらに2秒後に"Completed after 2 seconds"と表示される

    // 以下はエラー例を発生させるための処理
    const result3 = await delay(3); // この呼び出しはエラーになる
    console.log(result3);
  } catch (error) {
    console.error("Error in asyncAwaitExample:", error);
  } finally {
    console.log("Async/Await example finished");
  }
}

// メイン関数
async function main(): Promise<void> {
  console.log("Starting examples");

  // Promiseチェーンの例を実行
  promiseExample();

  // async/awaitの例を実行
  await asyncAwaitExample();

  console.log("All examples finished");
}

// メイン関数の実行
main().catch(error => {
  console.error("Unhandled error in main:", error);
});
