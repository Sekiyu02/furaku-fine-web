# 富楽ファイン コーポレートサイト

採用ブランディングパートナー 株式会社富楽ファインのWebサイト

## 🛠️ 技術スタック

- **フロントエンド**: 静的HTML/CSS/JavaScript
- **ホスティング**: Vercel
- **バージョン管理**: GitHub
- **アクセス解析**: Google Analytics 4
- **エディタ**: Cursor（推奨）

---

## 📁 ファイル構成

```
furaku-fine/
├── index.html          # トップページ
├── recruitment.html    # 採用ブランディング LP
├── medical.html        # 医療特化型採用 LP
├── knowledge.html      # ナレッジ一覧
├── admin.html          # 管理者ページ
├── articles/           # 記事フォルダ
│   └── sample-article-1.html
├── assets/
│   ├── images/         # 画像（今後追加）
│   └── css/            # 共通CSS（今後追加）
├── .cursorrules        # Cursor AIルール
├── .gitignore          # Git除外設定
├── vercel.json         # Vercel設定
└── README.md           # このファイル
```

---

## 🚀 セットアップ手順

### 1. Cursorでプロジェクトを開く

```bash
# Cursorでフォルダを開く
cursor /path/to/furaku-fine
```

または、Cursorアプリで「File → Open Folder」からフォルダを選択

### 2. GitHubリポジトリを設定

```bash
# 新規リポジトリの場合
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/furaku-fine.git
git push -u origin main

# 既存リポジトリの場合
git remote set-url origin https://github.com/YOUR_USERNAME/furaku-fine.git
```

### 3. Vercelと連携

1. [Vercel](https://vercel.com) にログイン
2. 「New Project」→ GitHubリポジトリを選択
3. デプロイ設定はデフォルトでOK
4. 「Deploy」をクリック

以降、`git push` するだけで自動デプロイされます。

---

## 📊 Google Analytics 4 設定

### 測定IDを取得

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 管理 → プロパティを作成 → ウェブストリーム設定
3. 測定ID（`G-XXXXXXXXXX`）をコピー

### HTMLファイルを一括置換

Cursorで `Cmd/Ctrl + Shift + H`（全体置換）:

```
検索: G-XXXXXXXXXX
置換: G-あなたの測定ID
対象: *.html
```

---

## 🔐 管理者ページ

| 項目 | 内容 |
|------|------|
| URL | `/admin.html` または `/admin` |
| パスワード | `furakufine0120` |

### パスワード変更

`admin.html` の以下を編集:

```javascript
const ADMIN_PASSWORD = 'furakufine0120'; // ← 変更
```

---

## 🎨 ブランドカラー

| 名前 | カラーコード | 用途 |
|------|-------------|------|
| Orange Primary | `#E67635` | メインカラー |
| Orange Light | `#F5A66A` | アクセント |
| Navy Dark | `#152a45` | 背景・テキスト |
| Gold (医療LP) | `#C9A66B` | 医療LP専用 |

---

## 📝 よく使う操作

### 記事を追加

1. `articles/sample-article-1.html` をコピー
2. ファイル名を変更
3. タイトル・本文を編集
4. GA4測定IDを設定
5. `knowledge.html` にリンク追加
6. `git push`

### デプロイ

```bash
git add .
git commit -m "Update: 変更内容"
git push origin main
# → Vercelが自動デプロイ
```

---

## 🤖 CursorでClaude AIを使う

### 方法1: Cursor Pro（推奨）

1. Cursorの設定（`Cmd/Ctrl + ,`）を開く
2. 「Models」タブを選択
3. 「claude-3.5-sonnet」を有効化
4. チャット（`Cmd/Ctrl + L`）でClaudeを使用可能

### 方法2: Anthropic APIキーを使用

1. [Anthropic Console](https://console.anthropic.com/) でAPIキーを取得
2. Cursor設定 → 「Models」→ 「Anthropic API Key」に入力
3. Claudeモデルが使用可能に

---

## 📞 お問い合わせ

株式会社富楽ファイン
