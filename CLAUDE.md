# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

個人ウェブサイト（ara-ta3.github.io）のモノレポ。Vikeを使用した静的サイト生成でGitHub Pagesにデプロイ。

## 開発コマンド

### 必須: pnpmを使用
```bash
# パッケージ管理は必ずpnpmを使用（only-allow pnpmで強制）
pnpm install
```

### 主要コマンド（Makefile経由）
```bash
make install     # 依存関係インストール
make server      # 開発サーバー起動（vike dev）
make build       # プロダクションビルド
make deploy      # GitHub Pagesにデプロイ

make test        # テスト実行
make test/watch  # テスト監視モード
make compile     # TypeScriptコンパイルチェック
make lint        # ESLint + Prettier チェック
make lint/fix    # リント自動修正
```

## アーキテクチャ

### フロントエンド（frontend/）
- **Vike**: フルスタックReactフレームワーク（SSG/プリレンダリング）
- **React 19 + TypeScript**: メインUI技術
- **Tailwind CSS + Flowbite**: UIフレームワーク
- **Vitest**: テストフレームワーム
- **エイリアス**: `@` = `./src`

### バックエンド（backend/）
- **Scala 3.7.1 + ZIO + ZIO HTTP**
- **sbt**: ビルドツール

### ビルド・デプロイフロー
1. `make build`でVikeビルド → 静的ファイル生成（`dist/`）
2. sitemap.xml、robots.txt、`.nojekyll`、`resources/cat`をコピー
3. `make deploy`でgh-pagesツールによりGitHub Pagesにデプロイ

### 特殊な設定
- **プリレンダリング有効**: 全ページ静的生成
- **D3.js対応**: SSR時のnoExternal設定
- **既存コンテンツ**: `resources/cat/calorie/`に猫のカロリー計算ツール（静的HTML）

## テスト・品質管理
- **Vitest**: `*.test.tsx`ファイルでコンポーネントテスト
- **スナップショットテスト**: `__snapshots__/`ディレクトリ
- **ESLint + Prettier**: コード品質とフォーマット統一