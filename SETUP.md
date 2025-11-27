# セットアップガイド

## 1. Google Cloud Consoleでの設定

### ステップ1: Custom Search JSON APIを有効化

1. Google Cloud Consoleで「**API とサービス**」をクリック
2. 左メニューから「**ライブラリ**」を選択
3. 検索バーで「**Custom Search JSON API**」を検索
4. 「**Custom Search JSON API**」をクリック
5. 「**有効にする**」ボタンをクリック

### ステップ2: APIキーの作成

1. 左メニューから「**認証情報**」を選択
2. 上部の「**認証情報を作成**」をクリック
3. 「**APIキー**」を選択
4. 作成されたAPIキーをコピー（後で使用します）
5. （推奨）APIキーの制限を設定：
   - 作成したAPIキーをクリック
   - 「APIキーの制限」で「**Custom Search JSON API**」のみを許可
   - 「保存」をクリック

### ステップ3: Custom Search Engineの作成

1. [Programmable Search Engine](https://programmablesearchengine.google.com/)にアクセス
2. 「**新しい検索エンジンを作成**」をクリック
3. 以下の設定を行います：
   - **検索対象**: 「ウェブ全体を検索」を選択、または特定のサイトを指定
   - **検索エンジン名**: 任意の名前を入力（例: "My Custom Search"）
4. 「**作成**」をクリック
5. 次の画面で「**制御パネル**」をクリック
6. 「**基本設定**」タブで「**検索エンジンID**」をコピー（後で使用します）

## 2. 環境変数の設定

プロジェクトのルートディレクトリに`.env`ファイルを作成し、以下の内容を記述してください：

```env
GOOGLE_API_KEY=ここに取得したAPIキーを貼り付け
GOOGLE_CSE_ID=ここに取得した検索エンジンIDを貼り付け
PORT=3000
NODE_ENV=development
```

## 3. アプリケーションの起動

```bash
# 開発モード（自動リロード付き）
npm run dev

# または本番モード
npm start
```

ブラウザで `http://localhost:3000` にアクセスして動作確認してください。

## トラブルシューティング

### APIキーが無効というエラーが出る場合
- APIキーが正しくコピーされているか確認
- Custom Search JSON APIが有効になっているか確認
- APIキーの制限設定を確認

### 検索結果が表示されない場合
- Custom Search Engine IDが正しいか確認
- 検索エンジンが正しく作成されているか確認
- ブラウザのコンソールでエラーメッセージを確認

### API制限に達したというエラーが出る場合
- Google Cloud Consoleで使用量を確認
- 無料枠は1日100リクエストまでです
- 必要に応じて課金を有効化
