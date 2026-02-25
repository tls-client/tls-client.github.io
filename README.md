# るーしー - Portfolio

## 概要
Web Developer / Reverse Engineering - るーしーのポートフォリオサイト

## 技術スタック
- HTML5
- CSS3 (CSS Variables, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- ビルド不要

## 特徴
- 🌙 ダーク/ライトテーマ切り替え（localStorage保存）
- 📱 モバイルファースト設計
- 🔍 検索機能
- 🍔 レスポンシブハンバーガーメニュー
- ✨ スムーススクロールとアニメーション
- ⚡ 軽量・高速

## ファイル構成
```
minimal-portfolio/
├── index.html      # メインHTMLファイル
├── style.css       # スタイルシート
├── script.js       # JavaScript機能
└── README.md       # このファイル
```

## セクション構成
- **Home**: プロフィール紹介とSNSリンク
- **Projects**: プロジェクトカード一覧
- **Blog**: ブログ記事カード（将来JSON対応）
- **About**: 詳細プロフィール（8つのカードセクション）

## ブログカテゴリ（将来拡張用）
- プロフィール
- 趣味
- 日記・記事
- 筋トレ・散歩
- 勉強・読書
- 計画・目標
- アニメ・漫画
- ゲーム
- アプリ
- ニュース
- 瞑想
- 学校生活
- 健康
- 家族
- 生活習慣
- 自己分析
- 自分磨き
- ネット活動
- 人生論
- 暮らし
- お金

## デプロイ方法
### GitHub Pages
1. このリポジトリをGitHubにプッシュ
2. Settings > Pages でソースを「Deploy from a branch」に設定
3. ブランチを「main」、フォルダを「/root」に設定
4. サイトが公開される

### ローカルで実行
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## カスタマイズ方法
### プロフィール情報の変更
`index.html`の以下の部分を編集：
- 名前：`.name`
- 肩書き：`.title`
- 自己紹介：`.bio`
- SNSリンク：`.social-links`

### プロジェクトの追加
`#projects`セクション内に`.project-card`を追加

### ブログ記事の追加
`#blog`セクション内に`.blog-card`を追加

### Aboutセクションの編集
`#about`セクション内の各`.about-card`を編集

### テーマカラーの変更
`style.css`の`:root`セレクタ内のCSS変数を編集

## JavaScript機能
- **ThemeManager**: テーマ切り替えと保存
- **NavigationManager**: ハンバーガーメニューとスクロール処理
- **SearchManager**: 検索機能とハイライト
- **ScrollManager**: スムーススクロール
- **AnimationManager**: スクロールアニメーション
- **UtilityManager**: 各種ユーティリティ機能

## ブラウザサポート
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## ライセンス
MIT License

## 作者
るーしー (Web Developer / Reverse Engineering)
