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
