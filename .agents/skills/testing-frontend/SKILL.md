---
name: testing-frontend
description: Vike フロントエンド (frontend/) をローカルでブラウザ E2E テストする手順。トップ・スライド・記事一覧などの UI 変更を確認するときに使う。
---

# testing-frontend

ara-ta3.github.io のフロントエンドを GUI で end-to-end テストするときの手順。Vike + React + TS + Tailwind の SSG なので、認証や外部依存は無く、ローカルだけで完結する。

## 前提

- `make install` で依存導入済み。実行環境のバージョンはリポジトリの設定ファイルを正本とする。
- 認証は不要（静的サイト）。
- 別ポートを潰さないよう作業前に `ss -ltnp | grep ':3000'` を確認。

## 推奨フロー

1. まず `make server` で開発サーバーを起動し、`http://localhost:3000` を確認する。
2. ただし `vike dev` は SSR の初回応答で 60〜90 秒以上ハングする環境がある（noExternal の D3.js などのバンドル都合と思われる）。`curl --max-time 30 http://localhost:3000/` で空応答が返る場合は次のフォールバックに切り替える。

## フォールバック: ビルド成果物を配信する

開発サーバーが応答しないときは、Makefile のビルド・配信 target を使って本番同等の生成 HTML を検証する。

```bash
# 1. クライアントだけビルド（marp/image は Puppeteer が必要なので避ける）
make build/frontend

# 2. スライドのカードからリンクされる /slides/<slug>.html もテストするなら marp も生成しておく
make marp

# 3. make server を起動した端末で Ctrl-C を押し、dev サーバーを停止する

# 4. ビルド成果物の配信サーバーを起動する
make server/dist

# 5. 別の端末から動作確認
curl -sS --max-time 10 -w 'HTTP %{http_code}\n' http://localhost:3000/
```

ビルド成果物には Vike のクライアント JS も同梱されているので、リンク遷移や `target="_blank"` の挙動も本番同等に確認できる。`/slides/<slug>.html` は `make marp` の出力でないとリンク切れになる点だけ注意。

## 既知の制約

- `make build` の `marp/image` ステップは Puppeteer + Chrome + 日本語フォント (`fonts-noto-cjk`) が要る。CI (ubuntu-latest) では通るが、軽量な Devin 環境では失敗しがち。GUI テストには不要なのでスキップ可能。
- 端末によっては `exec` 経由のシェル出力で日本語が文字化けする。`grep` のヒット件数を見るときは Python (`python3 -c "..."`) で UTF-8 のままカウントすると確実。

## E2E チェックの観点

トップページ (`+Page.tsx`) のレイアウトを変える PR では、最低限以下を確認する:

- セクションの並び順（DOM の `<h2>` 順）
- 各セクションが拾うデータ（`+data.ts` の戻り値と一致しているか、フィルタや `slice` が効いているか）
- 一覧ページ側に regression が無いか（除外フィルタを共通化しすぎて他ページから消えていないか）
- リンクの `href` と `target="_blank"`（middle_click でタブが開けば OK）

## Devin Secrets Needed

認証不要のため secrets は不要。
