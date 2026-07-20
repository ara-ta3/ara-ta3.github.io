# Repository Guidelines

このファイルを AI 向けの指示の正本とする。リポジトリについてのやり取りは日本語で行う。

## プロジェクト概要

- `ara-ta3.github.io` で公開する、ポートフォリオ・ブログ・登壇資料を含む個人サイト。
- フロントエンドは Vike + React + TypeScript による SSG。Tailwind CSS と Flowbite React を使用する。
- バックエンドは Scala + ZIO + zio-http。
- GitHub Actions でテスト・ビルドを行い、`master` を GitHub Pages へデプロイする。

## プロジェクト構成

- ルートは pnpm workspace。
- `frontend/`: フロントエンド。実装は `frontend/src/`、静的リソースは `frontend/resources/`、E2E テストは `frontend/tests/e2e/` に置く。
- `frontend/dist/`: ビルド成果物。手動編集しない。
- `backend/`: Scala バックエンド。エントリポイントは `backend/src/main/scala/io/github/ara_ta3/Main.scala`、設定は `backend/build.sbt`。
- `slides/`: Marp の登壇資料、テーマ、アセット。
- `scripts/`: ビルド補助スクリプト。

## 正本と実行入口

- AI 向けの指示は `AGENTS.md` を正本とする。他ツール向けの指示ファイルを増やす場合は、このファイルへのシンボリックリンクにする。
- 開発・検証・ビルドの実行入口はルートの `Makefile` を正本とする。AI、ローカル開発、CI のいずれも、対応する Make target がある処理では内部の CLI を直接呼ばない。
- 実行手順や利用ツールを変える場合は、先に Make target の実装を更新し、呼び出し側のコマンドを維持する。必要な target がない場合は、個別の場所にコマンドを複製せず Makefile に追加する。
- Make target に `.PHONY` は原則として付けない。同名のファイルやディレクトリと衝突する場合だけ使用する。
- 依存関係と実行環境のバージョンは `package.json`、`pnpm-workspace.yaml`、`backend/build.sbt` など各設定ファイルを正本とする。
- CI の起動条件、権限、デプロイ先は `.github/workflows/` を正本とする。AGENTS.md には変化しやすい実装詳細を重複させない。

## 開発コマンド

主な安定した実行入口は以下。その他の処理は Makefile の target を確認する。

```bash
make install
make server
make compile
make compile/backend
make lint
make lint/fix
make test
make test/e2e
make build
make server/build
```

`make deploy` は公開状態を変更するため、明示的に依頼された場合だけ実行する。

## コーディング方針

- TypeScript は strict を維持する。`@` alias で `frontend/src` を参照し、lint で禁止されている相対 import を追加しない。
- ESLint と Prettier の結果を正とする。手作業でスタイルを推測せず、変更後に `make lint` を実行する。
- `var` は使わず `const` を優先し、再代入が必要な場合だけ `let` を使う。非同期処理は Promise chain より `async` / `await` を優先する。
- 一時的なデバッグを除き `console.log` を残さない。
- React component は PascalCase、custom hook は `useXxx` と命名する。
- component の責務を明確にし、JSX 内のロジックを小さく保つ。小さな変更で不要なファイル分割や抽象化を増やさない。
- UI 変更では desktop だけでなく mobile のレスポンシブ表示も確認する。
- Vite、Tailwind などの設定ファイルは既存の module 形式と lint 例外に従う。

## テスト方針

- unit / DOM テストは実装の近くに `*.test.ts` または `*.test.tsx` として置き、`make test` で実行する。
- E2E テストは `frontend/tests/e2e/*.spec.ts` に置き、`make test/e2e` で実行する。
- テストごとの意図と期待値を明示する。UI の挙動を追加・変更した場合は、必要に応じて対応する E2E シナリオも更新する。
- Playwright の visual snapshot を更新する場合は、macOS 用と CI の Linux 用 baseline の違いに注意する。Linux baseline の更新には `make test/e2e/update/docker` を使える。

## ビルド・運用上の注意

- サイトの生成と付随リソースの配置は `make build` に集約する。生成手順を追加・変更する場合も、この target 内で完結させる。
- 公開対象やデプロイ手順は GitHub Actions workflow を正本とし、ローカルの確認には対応する Make target を使う。
- 秘密情報や環境固有の設定値をリポジトリへ含めない。
- 生成物、依存パッケージ、テスト結果を手動編集しない。

## コミット・PR

- コミットは既存履歴に合わせ、短い命令形の英語で要点を表す。
- PR には目的、主要な変更、実行した確認を記載する。UI 変更では必要に応じて差分画像を添える。
- 変更範囲に応じて `make lint`、`make test`、`make build`、`make test/e2e`、`make compile/backend` を実行する。
