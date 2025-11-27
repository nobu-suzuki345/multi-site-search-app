// Google Custom Search API設定のヘルパーファイル
// このファイルは参考用です。実際の設定は.envファイルで行ってください。

module.exports = {
    // Google APIキーの取得方法:
    // 1. https://console.cloud.google.com/ にアクセス
    // 2. プロジェクトを選択または作成
    // 3. 「APIとサービス」→「ライブラリ」から「Custom Search JSON API」を検索して有効化
    // 4. 「認証情報」→「認証情報を作成」→「APIキー」でAPIキーを作成
    
    // Custom Search Engine IDの取得方法:
    // 1. https://programmablesearchengine.google.com/ にアクセス
    // 2. 「新しい検索エンジンを作成」をクリック
    // 3. サイトを指定（例: www.google.com で全Web検索）
    // 4. 検索エンジン名を入力して作成
    // 5. コントロールパネルで「検索エンジンID」を確認
    
    // 注意: APIキーは.envファイルに設定してください
    // このファイルには実際のキーを記述しないでください
};
