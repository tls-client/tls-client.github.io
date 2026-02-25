// ===================================
// DOM要素の取得
// ===================================
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const navLinks = document.querySelectorAll('.nav-link');

// ===================================
// テーマ切り替え機能
// ===================================
class ThemeManager {
    constructor() {
        this.themeIcon = themeToggle.querySelector('.theme-icon');
        this.init();
    }

    init() {
        // localStorageからテーマ設定を読み込み
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // システムのテーマ設定を検出
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }

        // テーマ切り替えボタンのイベントリスナー
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // システムテーマ変更の監視
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    updateThemeIcon(theme) {
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ===================================
// ハンバーガーメニュー機能
// ===================================
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // ハンバーガーメニューの開閉
        hamburger.addEventListener('click', () => this.toggleMenu());

        // ナビゲーションリンククリック時にメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // メニュー外クリック時にメニューを閉じる
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // スクロール時のヘッダー処理
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
}

// ===================================
// 検索機能
// ===================================
class SearchManager {
    constructor() {
        this.init();
    }

    init() {
        // 検索ボタンクリック時
        searchBtn.addEventListener('click', () => this.performSearch());

        // Enterキーで検索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // 検索入力のリアルタイムフィードバック（オプション）
        searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });
    }

    performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        // 現在のセクションを検索
        this.searchInSection(query);
        
        // 検索結果をハイライト
        this.highlightSearchResults(query);
        
        // 検索ログ（デバッグ用）
        console.log(`検索クエリ: ${query}`);
    }

    searchInSection(query) {
        const sections = document.querySelectorAll('.section');
        let found = false;

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                section.style.display = 'flex';
                found = true;
            } else {
                section.style.display = 'none';
            }
        });

        // 見つからない場合は全セクションを表示
        if (!found) {
            sections.forEach(section => {
                section.style.display = 'flex';
            });
            this.showNoResultsMessage();
        }
    }

    highlightSearchResults(query) {
        // 既存のハイライトを削除
        document.querySelectorAll('.search-highlight').forEach(el => {
            const parent = el.parentNode;
            parent.textContent = parent.textContent;
        });

        if (!query) return;

        // 新しいハイライトを追加
        const regex = new RegExp(`(${query})`, 'gi');
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(node => {
            if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
                const span = document.createElement('span');
                span.innerHTML = node.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
                node.parentNode.replaceChild(span, node);
            }
        });
    }

    handleSearchInput(value) {
        // リアルタイム検索の実装（オプション）
        if (value.length > 2) {
            this.performSearch();
        } else if (value.length === 0) {
            // 検索クリア時に全セクションを表示
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'flex';
            });
            // ハイライトを削除
            document.querySelectorAll('.search-highlight').forEach(el => {
                const parent = el.parentNode;
                parent.textContent = parent.textContent;
            });
        }
    }

    showNoResultsMessage() {
        // 検索結果なしメッセージの表示（オプション）
        const message = document.createElement('div');
        message.className = 'no-results';
        message.textContent = '検索結果が見つかりませんでした';
        message.style.cssText = `
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
            grid-column: 1 / -1;
        `;
        
        const container = document.querySelector('.container');
        if (container && !document.querySelector('.no-results')) {
            container.appendChild(message);
            
            // 3秒後にメッセージを削除
            setTimeout(() => {
                message.remove();
            }, 3000);
        }
    }
}

// ===================================
// スムーススクロール機能
// ===================================
class ScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // ナビゲーションリンクのスムーススクロール
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    this.scrollToSection(targetId);
                }
            });
        });

        // ページ読み込み時のハッシュ処理
        window.addEventListener('load', () => {
            const hash = window.location.hash;
            if (hash) {
                setTimeout(() => {
                    this.scrollToSection(hash);
                }, 100);
            }
        });
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ===================================
// アニメーション機能
// ===================================
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // スクロール時のフェードインアニメーション
        this.setupScrollAnimations();
        
        // ホバーエフェクトの強化
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // カード要素に初期スタイルと監視を設定
        document.querySelectorAll('.project-card, .blog-card, .about-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    setupHoverEffects() {
        // カードのホバーエフェクトを強化
        document.querySelectorAll('.project-card, .blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// ===================================
// ユーティリティ機能
// ===================================
class UtilityManager {
    constructor() {
        this.init();
    }

    init() {
        // 外部リンクの処理
        this.setupExternalLinks();
        
        // 画像の遅延読み込み（オプション）
        this.setupLazyLoading();
        
        // パフォーマンス監視（オプション）
        this.setupPerformanceMonitoring();
    }

    setupExternalLinks() {
        // 外部リンクを新しいタブで開く
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    setupLazyLoading() {
        // 画像の遅延読み込み設定
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupPerformanceMonitoring() {
        // ページ読み込み時間の監視（開発用）
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`ページ読み込み時間: ${loadTime.toFixed(2)}ms`);
        });
    }
}

// ===================================
// アプリケーションの初期化
// ===================================
class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.searchManager = new SearchManager();
        this.scrollManager = new ScrollManager();
        this.animationManager = new AnimationManager();
        this.utilityManager = new UtilityManager();
        
        this.init();
    }

    init() {
        // DOM読み込み完了時の処理
        document.addEventListener('DOMContentLoaded', () => {
            console.log('ポートフォリオサイトが読み込まれました');
            
            // 初期アニメーション
            this.setupInitialAnimation();
        });

        // エラーハンドリング
        window.addEventListener('error', (e) => {
            console.error('JavaScriptエラー:', e.error);
        });
    }

    setupInitialAnimation() {
        // ページ読み込み時の初期アニメーション
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
}

// ===================================
// アプリケーションの起動
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// ===================================
// グローバル関数（デバッグ用）
// ===================================
// 開発コンソールから利用できる関数
window.toggleTheme = () => {
    const themeManager = new ThemeManager();
    themeManager.toggleTheme();
};

window.searchSite = (query) => {
    const searchManager = new SearchManager();
    searchInput.value = query;
    searchManager.performSearch();
};

// ===================================
// サービスワーカー登録（PWA対応、オプション）
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // サービスワーカーの登録はオプション
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('SW registered: ', registration);
        // }).catch(registrationError => {
        //     console.log('SW registration failed: ', registrationError);
        // });
    });
}
