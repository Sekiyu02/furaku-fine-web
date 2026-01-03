# 🖥️ Cursor セットアップガイド

このドキュメントでは、CursorでClaude AIを使い、GitHub経由でVercelにデプロイする方法を説明します。

---

## 📥 Step 1: Cursorのインストール

### ダウンロード
1. [Cursor公式サイト](https://cursor.sh/) にアクセス
2. 「Download」をクリック
3. インストーラーを実行

### 初期設定
1. Cursorを起動
2. アカウント作成（メール or GitHub連携）
3. 初回起動時にVS Code設定のインポート可能

---

## 🤖 Step 2: CursorでClaude AIを使う

### 方法A: Cursor Pro プラン（月額$20）

最も簡単な方法です。

1. Cursor右下の「Upgrade」をクリック
2. Cursor Proに登録
3. 設定（`Cmd/Ctrl + ,`）→「Models」タブ
4. 「claude-3.5-sonnet」にチェック ✅

これでClaude Sonnetが使えます！

### 方法B: Anthropic APIキーを使用（従量課金）

自分のAPIキーを使う方法です。

1. [Anthropic Console](https://console.anthropic.com/) にアクセス
2. アカウント作成 & ログイン
3. 「API Keys」→「Create Key」
4. APIキーをコピー（`sk-ant-...`）
5. Cursor設定 → 「Models」タブ
6. 「Anthropic API Key」欄に貼り付け
7. 「claude-3.5-sonnet」または「claude-3-opus」を選択

### AIの使い方

| ショートカット | 機能 |
|---------------|------|
| `Cmd/Ctrl + L` | AIチャットを開く |
| `Cmd/Ctrl + K` | インラインでコード編集 |
| `Cmd/Ctrl + I` | Composer（複数ファイル編集） |

---

## 📂 Step 3: プロジェクトを開く

### ZIPを解凍してCursorで開く

1. ダウンロードした `furaku-fine-cursor.zip` を解凍
2. Cursorを起動
3. 「File」→「Open Folder」
4. 解凍したフォルダを選択

### .cursorrules について

プロジェクトルートにある `.cursorrules` ファイルは、AIにプロジェクトの文脈を伝えるためのファイルです。

- プロジェクト概要
- 技術スタック
- ブランドカラー
- コーディング規約

AIに質問する際、この情報が自動的に参照されます。

---

## 🔗 Step 4: GitHubリポジトリを作成

### GitHubでリポジトリ作成

1. [GitHub](https://github.com/) にログイン
2. 右上の「+」→「New repository」
3. Repository name: `furaku-fine`（任意）
4. Public / Private を選択
5. 「Create repository」

### Cursorからプッシュ

Cursorのターミナル（`Ctrl + `` ）で：

```bash
# Git初期化（初回のみ）
git init

# リモートリポジトリを設定
git remote add origin https://github.com/YOUR_USERNAME/furaku-fine.git

# 全ファイルを追加
git add .

# コミット
git commit -m "Initial commit: Furaku Fine website"

# プッシュ
git branch -M main
git push -u origin main
```

### Cursorのソース管理パネル

左サイドバーの「Source Control」アイコン（枝分かれマーク）からもGit操作可能：

- 変更ファイルの確認
- ステージング（+ボタン）
- コミット（メッセージ入力 → ✓）
- プッシュ（...メニュー → Push）

---

## 🚀 Step 5: Vercelと連携

### Vercelアカウント作成

1. [Vercel](https://vercel.com/) にアクセス
2. 「Sign Up」→ GitHubアカウントで登録（推奨）

### プロジェクトをインポート

1. Vercelダッシュボードで「Add New...」→「Project」
2. 「Import Git Repository」
3. `furaku-fine` リポジトリを選択
4. 設定はデフォルトでOK
5. 「Deploy」をクリック

### 自動デプロイ

設定完了後は、GitHubに `git push` するだけで自動デプロイされます！

```bash
# コードを修正後
git add .
git commit -m "Update: 変更内容"
git push
# → 30秒〜1分でVercelに反映
```

---

## 📊 Step 6: Google Analytics 4 設定

### GA4プロパティを作成

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. Googleアカウントでログイン
3. 「管理」（左下の歯車）→「プロパティを作成」
4. プロパティ名: `富楽ファイン`
5. タイムゾーン: 日本
6. 「次へ」→ ビジネス情報を入力
7. 「ウェブ」を選択
8. URLを入力（例: `https://furaku-fine.vercel.app`）
9. 「ストリームを作成」
10. **測定ID**（`G-XXXXXXXXXX`）をコピー

### 測定IDを一括置換

Cursorで `Cmd/Ctrl + Shift + H`（全体置換）:

```
検索: G-XXXXXXXXXX
置換: G-あなたの測定ID
対象ファイル: *.html
```

「すべて置換」をクリック → 保存 → `git push`

---

## ✅ 完了チェックリスト

- [ ] Cursorをインストールした
- [ ] Claude AIを有効化した（Pro or APIキー）
- [ ] プロジェクトをCursorで開いた
- [ ] GitHubリポジトリを作成した
- [ ] Vercelと連携した
- [ ] GA4測定IDを設定した
- [ ] サイトが正常に表示されることを確認した

---

## 🆘 トラブルシューティング

### Q: Vercelでデプロイエラーが出る

A: `vercel.json` の構文エラーがないか確認してください。

### Q: GA4でデータが表示されない

A: 反映まで24〜48時間かかることがあります。「リアルタイム」レポートで確認してください。

### Q: CursorでClaudeが使えない

A: 設定 → Models で有効化されているか確認。APIキーの場合は残高も確認。

### Q: git pushでエラーが出る

A: 認証エラーの場合、GitHubの「Personal Access Token」が必要な場合があります。

---

## 📚 参考リンク

- [Cursor 公式ドキュメント](https://cursor.sh/docs)
- [Vercel 公式ドキュメント](https://vercel.com/docs)
- [Google Analytics 4 ヘルプ](https://support.google.com/analytics)
- [GitHub Docs](https://docs.github.com/)
