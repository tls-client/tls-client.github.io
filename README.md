# るーしーのホームページ

Web Developer & Reverse Engineering

## 🚀 GitHub Pagesでデプロイする方法

### 1. GitHubリポジトリを作成
1. GitHubで新しいリポジトリを作成します
2. リポジトリ名は `username.github.io` または任意の名前（例：`homepage`）にします

### 2. ファイルをアップロード
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

### 3. GitHub Pagesを有効化
1. リポジトリのSettingsに移動
2. "Pages"セクションをクリック
3. Sourceを"Deploy from a branch"に設定
4. Branchを"main"と"/ (root)"に選択
5. "Save"をクリック

### 4. サイトにアクセス
- `username.github.io` または `username.github.io/repository-name` でアクセスできます

## 📁 プロジェクト構成

```
rucy-homepage/
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # JavaScript機能
└── README.md           # このファイル
```

## 🎨 デザインの特徴

- **モダンな黒白テーマ**: シンプルで洗練されたデザイン
- **ダークモード対応**: ワンタップでテーマ切り替え可能
- **モバイルファースト**: スマートフォンでの表示を最適化
- **レスポンシブデザイン**: あらゆるデバイスで美しく表示

## 🛠️ 機能一覧

### ナビゲーション
- Home: プロフィールとSNSリンク（Litlink/Linktree風）
- Projects: GitHubプロジェクトの紹介
- Blog: ブログ記事、アーカイブ、カテゴリ

### ヘッダー機能
- **ハンバーガーメニュー**: モバイル用ナビゲーション
- **テーマ切り替え**: 🌙/☀️ アイコンでダーク/ライトモード切替
- **検索バー**: サイト内検索機能

### ホームセクション
- プロフィールカード（アイコン、名前、肩書き、自己紹介）
- SNSリンク集（12個のプラットフォームに対応）

### プロジェクトセクション
- サムネイル付きプロジェクトカード
- タグ表示
- GitHubリンク

### ブログセクション
- 最新記事、アーカイブ、カテゴリ表示
- サムネイル、タイトル、メタデータ
- 22個のカテゴリ分類

### About Meセクション
- Profile: 基本情報
- Hobby: 趣味
- Life: 生活ルーティン
- Device: 使用デバイス
- Skills: 得意なプログラミング言語
- Social Link: SNSリンク
- Contact: 連絡先

## 🎯 カスタマイズ方法

### プロフィール情報の編集
`index.html` の以下の部分を編集：
- プロフィール名: `<h1 class="profile-name">るーしー</h1>`
- 肩書き: `<p class="profile-title">Web Developer and Reverse Engineering</p>`
- 自己紹介: `<p class="profile-bio">...</p>`
- アイコン画像: `<img src="..." alt="るーしー" class="avatar-img">`

### SNSリンクの編集
`index.html` の `.social-grid` セクションでリンクと名前を編集

### プロジェクトの編集
`index.html` の `.projects-grid` セクションでプロジェクト情報を編集

### ブログ記事の編集
`index.html` の `.blog-posts` セクションで記事情報を編集

### カラーテーマのカスタマイズ
`styles.css` の `:root` セレクタでカラーコードを編集

## ⌨️ キーボードショートカット

- `Ctrl/Cmd + K`: 検索バーにフォーカス
- `Ctrl/Cmd + /`: テーマ切り替え
- `Esc`: モバイルメニューを閉じる

## 🌐 対応ブラウザ

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📱 モバイル対応

- スマートフォンでの最適化表示
- タッチフレンドリーなインターフェース
- ハンバーガーメニュー対応
- スワイプジェスチャー対応（オプション）

## 🔧 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox, Grid, CSS Variables
- **Vanilla JavaScript**: インタラクティブ機能
- **レスポンシブデザイン**: Mobile-firstアプローチ

## 📝 ライセンス

このプロジェクトはMITライセンスの下で提供されています。

## 🤝 貢献

バグ報告や機能リクエストはGitHub Issuesで受け付けています。

---

**作成者**: るーしー  
**最終更新**: 2024年1月19日
