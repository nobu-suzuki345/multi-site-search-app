const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
// 環境変数の読み込み（.env.localが優先、次に.env）
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // .envも読み込む（.env.localがない場合のフォールバック）

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

// Google Custom Search APIの設定
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;

// 検索APIエンドポイント
app.post('/api/search', async (req, res) => {
    try {
        const { query, sites } = req.body;
        
        if (!query) {
            return res.status(400).json({ error: '検索クエリが必要です' });
        }
        
        if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
            return res.status(500).json({ error: 'API設定が完了していません' });
        }
        
        const url = `https://www.googleapis.com/customsearch/v1`;

        // サイト指定がない場合は通常の検索
        if (!sites || !Array.isArray(sites) || sites.length === 0) {
            const params = {
                key: GOOGLE_API_KEY,
                cx: GOOGLE_CSE_ID,
                q: query,
                num: 10
            };
            const response = await axios.get(url, { params });
            return res.json({
                results: [{
                    site: 'Web全体',
                    items: response.data.items || []
                }]
            });
        }

        // サイトごとに並列で検索を実行
        const searchPromises = sites.map(async (site) => {
            const url = `https://www.googleapis.com/customsearch/v1`;
            let searchSite = site;
            // X(旧Twitter)対応
            if (site === 'x.com') {
                searchSite = 'site:x.com OR site:twitter.com';
            } else {
                searchSite = `site:${site}`;
            }

            const params = {
                key: GOOGLE_API_KEY,
                cx: GOOGLE_CSE_ID,
                q: `${query} ${searchSite}`,
                num: 10 // 各サイト10件ずつ
            };

            console.log(`Searching for ${site}... Query: ${params.q}`);

            try {
                const response = await axios.get(url, { params });
                console.log(`Success ${site}: ${response.data.items?.length || 0} items`);
                return {
                    site: site,
                    items: response.data.items || []
                };
            } catch (error) {
                console.error(`Error searching ${site}:`, error.message);
                if (error.response) {
                    console.error('API Error Details:', JSON.stringify(error.response.data, null, 2));
                }
                return {
                    site: site,
                    items: [],
                    error: error.response?.data?.error?.message || '検索に失敗しました'
                };
            }
        });

        const results = await Promise.all(searchPromises);
        
        res.json({ results });
        
    } catch (error) {
        console.error('Search API error:', error.response?.data || error.message);
        
        if (error.response?.status === 403) {
            res.status(403).json({ error: 'APIキーが無効です' });
        } else if (error.response?.status === 429) {
            res.status(429).json({ error: 'API制限に達しました' });
        } else {
            res.status(500).json({ error: '検索中にエラーが発生しました' });
        }
    }
});

// メインページ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ヘルスチェック
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 サーバーが起動しました: http://localhost:${PORT}`);
    console.log('📝 以下の環境変数を設定してください:');
    console.log('   GOOGLE_API_KEY=あなたのGoogle APIキー');
    console.log('   GOOGLE_CSE_ID=あなたのCustom Search Engine ID');
});
