class GoogleSearchApp {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.resultsContainer = document.getElementById('results');
        
        this.init();
    }
    
    init() {
        this.searchButton.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }
    
    async performSearch() {
        const query = this.searchInput.value.trim();
        
        // チェックされたサイトを取得
        const checkedSites = Array.from(document.querySelectorAll('input[name="site"]:checked'))
            .map(cb => cb.value);
        
        if (!query) {
            this.showError('検索キーワードを入力してください');
            return;
        }
        
        this.showLoading();
        
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    query,
                    sites: checkedSites 
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                this.showError(data.error);
            } else {
                this.displayGroupedResults(data.results || []);
            }
        } catch (error) {
            this.showError('検索中にエラーが発生しました');
            console.error('Search error:', error);
        }
    }
    
    showLoading() {
        this.resultsContainer.innerHTML = `
            <div class="loading">
                <p>検索中...</p>
            </div>
        `;
    }
    
    showError(message) {
        this.resultsContainer.innerHTML = `
            <div class="error">
                <p>${message}</p>
            </div>
        `;
    }
    
    displayGroupedResults(results) {
        if (results.length === 0 || results.every(r => r.items.length === 0)) {
            this.resultsContainer.innerHTML = `
                <div class="loading">
                    <p>検索結果が見つかりませんでした</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(group => {
            if (group.items.length === 0) return '';

            const itemsHTML = group.items.map(result => `
                <div class="result-item">
                    <a href="${result.link}" class="result-title" target="_blank" rel="noopener">
                        ${result.title}
                    </a>
                    <p class="result-snippet">${result.snippet}</p>
                    <p class="result-url">${result.displayLink}</p>
                </div>
            `).join('');

            return `
                <div class="site-results-group">
                    <h2 class="site-title">${this.getSiteName(group.site)}</h2>
                    <div class="site-items">
                        ${itemsHTML}
                    </div>
                </div>
            `;
        }).join('');
        
        this.resultsContainer.innerHTML = resultsHTML;
    }

    getSiteName(domain) {
        const names = {
            'qiita.com': 'Qiita',
            'linkedin.com': 'LinkedIn',
            'x.com': 'X (Twitter)',
            'instagram.com': 'Instagram',
            'zenn.dev': 'Zenn',
            'note.com': 'note',
            'stackoverflow.com': 'Stack Overflow',
            'github.com': 'GitHub',
            'wikipedia.org': 'Wikipedia',
            'Web全体': 'Web全体'
        };
        return names[domain] || domain;
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new GoogleSearchApp();
});
