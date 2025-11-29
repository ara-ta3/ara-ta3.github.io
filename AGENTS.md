# Repository Guidelines

## プロジェクト構成と配置
- ルートは pnpm ワークスペース。フロントエンドは `frontend/`（Vike + React + TypeScript + Tailwind）、静的リソースは `frontend/resources/`（sitemap、robots、cat アセット）、ビルド成果物は `frontend/dist/` で手動編集禁止。
- バックエンドは Scala（ZIO + zio-http）で `backend/src/main/scala/io/github/ara_ta3/Main.scala` に配置、設定は `backend/build.sbt`。
- テスト関連は `frontend/tests/`（単体/DOM 用セットアップ）と `frontend/tests/e2e/`（Playwright）。`frontend/test-results/` は生成物。

## ビルド・開発コマンド
- 依存導入は `pnpm install` もしくは `make install`（preinstall で pnpm のみ許可）。
- 開発サーバーは `make server`（Vike dev）。型チェックのみは `make compile`（tsc --noEmit）。
- 本番ビルドは `make build`：クライアントを生成し sitemap/robots/cat をコピーし `.nojekyll` を付与。
- ビルド成果物プレビューは `make server/build`（3000 番）、デプロイは `make deploy`（gh-pages で `frontend/dist` を公開）。

## コーディングスタイル・命名
- TypeScript/React は strict。`@` エイリアスで `frontend/src` を解決し、相対パス（./, ../）は lint で禁止。
- ESLint（typescript-eslint, import/order）+ Prettier を使用。`make lint` / `make lint/fix`、`make lint/prettier` で整形。インデントは 2 スペース、import は builtin→external→internal 順。
- Tailwind 設定は `tailwind.config.js`、設定ファイル（vite/tailwind 等）は CommonJS 風 import 例外ルールあり。

## テスト方針
- 単体/DOM テストは `make test`（Vitest、jsdom、`tests/setup.ts`）。監視実行は `make test/watch`。
- E2E は `make install/playwright` 実行後に `make test/e2e`（`playwright.config.ts` で dev サーバーを自動起動、失敗時にスクリーンショット/動画取得）。UI 追加時は該当ページのシナリオを追加。
- テストファイルは `tests/**/*.spec.ts` または `tests/e2e/*.spec.ts` とし、既存の JSON-LD 検証例を参考に期待値を明示。

## コミット・PR ルール
- 履歴は短い命令形英語が多い（例: `Fix lint`, `Add ...`, 依存更新は `Update ... (#123)`）。同様に 1 行で要点をまとめる。
- PR には目的、主要変更点、実施テスト（lint/test/build）を列挙。UI 変更は差分キャプチャを添付し、関連 Issue/チケットがあればリンク。
- CI 依存が薄いため、提出前にローカルで lint/test/build を完了すること。

## セキュリティ・運用メモ
- GitHub Pages 公開が前提。`frontend/resources/sitemap.xml` と `robots.txt` をビルドに含めること、秘密情報をリポジトリに含めないこと。
- バックエンドを動かす場合は `sbt run` など別プロセスで起動し、ポート衝突を避ける。設定値をコードベタ書きしない。
