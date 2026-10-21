# LumoAlpha LP（本番）

https://lumoalpha.jp/lp で公開しているランディングページのソースです。

## このリポジトリで編集するもの

- `index.html`, `contact.html`
- `css/`, `js/`, `images/`

アプリ本体（Next.js / Prisma など）は **[LumoAlpha](https://github.com/Zerive-Web/LumoAlpha)** で開発します。LP の変更は **このリポジトリだけ** で行い、開発リポジトリの `public/lp` はサブモジュールで参照します。

## ローカル確認

```bash
python3 -m http.server 8778
# http://127.0.0.1:8778/index.html
```

アプリ経由: `LumoAlpha-開発/public` で `python3 -m http.server 8777` → `/lp/index.html`

## 本番反映の流れ

1. このリポジトリ（`~/Desktop/LumoAlpha-LP`）で変更 → push `main`
2. `~/Desktop/LumoAlpha-開発` で `public/lp` サブモジュールを更新 → push（Vercel）
