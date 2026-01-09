# 株式会社富楽ファイン コーポレートサイト

## 1. プロジェクト概要

- **株式会社富楽ファイン** の自社ホームページ（静的HTMLサイト）
- 現在 **4ページ構成**（+ 管理画面）で、新規1ページ追加予定
- Vercel にデプロイ

## 2. 使用技術

| 技術 | 用途 |
|------|------|
| HTML5 | ページ構造 |
| CSS3 | スタイリング（各ページ専用CSS） |
| JavaScript (ES6) | インタラクション・アニメーション |
| Google Fonts | Cormorant Garamond, Noto Sans JP, Noto Serif JP |
| Vercel | ホスティング・デプロイ |

## 3. ページ構成

| URL | ファイル | 役割 |
|-----|----------|------|
| `/` | index.html | トップページ（理念・サービス紹介・会社概要・お問い合わせ） |
| `/recruitment` | recruitment.html | 採用ブランディング伴走支援サービスページ |
| `/medical` | medical.html | 医療特化型採用ブランディングサービスページ |
| `/knowledge` | knowledge.html | ナレッジ記事一覧ページ |
| `/admin` | admin.html | 管理画面（非公開・noindex） |

## 4. ディレクトリ構成

```
furaku-fine/
├── index.html              # トップページ
├── recruitment.html        # 採用ブランディングページ
├── medical.html            # 医療特化型ページ
├── knowledge.html          # ナレッジページ
├── admin.html              # 管理画面
├── vercel.json             # Vercel設定（リライト・ヘッダー）
├── assets/
│   ├── css/
│   │   ├── index.css       # トップページ用CSS
│   │   ├── recruitment.css # 採用ブランディング用CSS
│   │   ├── medical.css     # 医療特化型用CSS
│   │   └── knowledge.css   # ナレッジ用CSS
│   ├── js/
│   │   ├── index.js        # トップページ用JS
│   │   ├── recruitment.js  # 採用ブランディング用JS
│   │   ├── medical.js      # 医療特化型用JS
│   │   └── knowledge.js    # ナレッジ用JS
│   └── images/             # 画像ファイル
│       ├── logo-jp.svg     # 日本語ロゴ
│       ├── logo-en.svg     # 英語ロゴ
│       ├── index/          # トップページ用画像
│       ├── recruitment/    # 採用ブランディング用画像
│       └── works/          # 制作実績画像
└── articles/               # 記事テンプレート
    └── sample-article-1.html
```

## 5. 開発・起動方法

### ローカル開発

静的HTMLサイトのため、以下の方法で確認できます：

```bash
# 方法1: VS Code Live Server
# VS Codeの「Live Server」拡張機能をインストールし、index.htmlを右クリック → "Open with Live Server"

# 方法2: Python簡易サーバー
python -m http.server 8000
# http://localhost:8000 でアクセス

# 方法3: Node.js serve
npx serve .
# http://localhost:3000 でアクセス
```

### Vercelへのデプロイ

```bash
# Vercel CLIでデプロイ
vercel --prod
```

## 6. 注意事項

- Google Analytics の測定ID（G-XXXXXXXXXX）は各HTMLファイル内で設定
- 画像はAdobe Stockから購入したものを使用
- admin.html は検索エンジンからnoindex設定済み
