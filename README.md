# LumoAlpha LP（本番）

https://lumoalpha.jp/lp で公開しているランディングページのソースです。

## このリポジトリで編集するもの

- `index.html`, `contact.html`
- `css/`, `js/`, `images/`

アプリ本体（Next.js / Prisma など）は **[LumoAlpha](https://github.com/Zerive-Web/LumoAlpha)** で開発します。LP の変更は **このリポジトリだけ** で行い、開発リポジトリの `public/lp` はサブモジュールで参照します。

## ローカル確認

```bash
cd public   # LumoAlpha 開発リポジトリ側
python3 -m http.server 8777
# http://127.0.0.1:8777/lp/index.html
```

またはこのフォルダ単体:

```bash
python3 -m http.server 8778
# http://127.0.0.1:8778/index.html
```

## 本番反映の流れ

1. このリポジトリで変更 → commit → `git push origin main`
2. LumoAlpha 開発リポジトリでサブモジュールの参照を更新 → push（Vercel デプロイ）
