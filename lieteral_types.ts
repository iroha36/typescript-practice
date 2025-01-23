interface TextMessage {
  type: 'text'; // ここがリテラル型
  text: string;
}

interface ImageMessage {
  type: 'image'; // ここがリテラル型
  url: string;
}

interface VideoMessage {
  type: 'video'; // ここがリテラル型
  url: string;
  duration: number;
}

type Message = TextMessage | ImageMessage | VideoMessage;

function handleMessage(message: Message) {
  switch (message.type) {
    case 'text':
      console.log(`テキスト: ${message.text}`);
      break;
    case 'image':
      console.log(`画像URL: ${message.url}`);
      break;
    case 'video':
      console.log(`動画URL: ${message.url}, 長さ: ${message.duration}`);
      break;
  }
}

type A = "1" | "2" | "3";

import * as readline from "readline";

// 標準入力を設定
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// プロンプトを表示
rl.question("Enter a value (1, 2, or 3): ", (input) => {
  // 型ガードで検証
  if (isA(input)) {
    const value: A = input; // 型Aの変数に代入
    console.log(`Valid value of type A: ${value}`);
  } else {
    console.error("Error: Invalid value. Please enter '1', '2', or '3'.");
  }

  // 終了
  rl.close();
});

// 型ガード関数
function isA(value: string): value is A {
  return value === "1" || value === "2" || value === "3";
}