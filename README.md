# Google Custom Search App

Google Custom Search JSON APIを使用した検索アプリケーションです。

## セットアップ方法

### 1. 依存パッケージのインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env`ファイルを作成し、以下の情報を設定してください：

```env
GOOGLE_API_KEY=あなたのGoogle APIキー
GOOGLE_CSE_ID=あなたのCustom Search Engine ID
PORT=3000
```

### 3. Google APIの設定方法

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「Custom Search JSON API」を有効化
4. APIキーを作成
5. [Programmable Search Engine](https://programmablesearchengine.google.com/)で検索エンジンを作成
6. 作成した検索エンジンのIDを取得

### 4. アプリケーションの起動
```bash
# 開発モード
npm run dev

# 本番モード
npm start
```

## 使用方法

1. ブラウザで `http://localhost:3000` にアクセス
2. 極索ボックスにキーワードを入力
3. 「検索」ボタンをクリックまたはEnterキーを押下

## APIエンドポイント

- `POST /api/search` - 検索実行
- `GET /health` - ヘルスチェック

## 技術スタック

- Node.js
- Express.js
- Axios
- Vanilla JavaScript
- CSS3
