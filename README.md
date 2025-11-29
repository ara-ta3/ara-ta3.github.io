ara-ta3の物置
---

https://ara-ta3.github.io/

## ディレクトリ構成

フロントエンドのコードは `frontend/` ディレクトリ以下に配置されています。pnpm のワークスペース機能を利用して管理しています。

バックエンドのコードは `backend/` ディレクトリ以下に Scala で構成されています。

## 技術構成図

```mermaid
graph TD
  Dev[DEV] -->|pnpm / make build| FE[frontend/ - Vike + React + TS]
  FE --> Dist[frontend/dist]
  Dist -->|gh-pages へデプロイ| Pages[GitHub Pages]
  Dev -->|sbt run| BE[backend/ - ZIO + zio-http]
  Dev -.->|ローカルAPI利用| BE
```

## フロントエンド構成図

```mermaid
graph TD
  Root[frontend/] --> Src[src/]
  Src --> Pages[pages/ - ルーティング]
  Src --> Components[components/ - 再利用コンポーネント]
  Src --> Data[data/ - コンテンツデータ]
  Src --> Assets[assets/ - 画像など]
  Src --> Utils[utils/ - 共通ユーティリティ]
  Src --> Hooks[hooks/ - カスタムフック]
  Root --> Resources[resources/ - sitemap・robotsなど静的]
  Root --> Tests[tests/ - Unit/DOM]
  Tests --> E2E[tests/e2e/ - Playwright]
  Root -.-> Dist[dist/ - ビルド成果物]
  Root -.-> TestResults[test-results/ - 生成物]
```
