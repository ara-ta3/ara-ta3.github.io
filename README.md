ara-ta3の物置
---

https://ara-ta3.github.io/

## ディレクトリ構成

フロントエンドのコードは `frontend/` ディレクトリ以下に配置されています。pnpm のワークスペース機能を利用して管理しています。

バックエンドは `backend/` に Scala で置く構想がありますが、今のところやりたいことが不明確で未実装です。  

## 技術構成図

```mermaid
graph TD
  Dev[DEV] -->|pnpm / make build| FE[frontend/ - Vike + React + TS]
  FE --> Dist[frontend/dist]
  Dist -->|gh-pages へデプロイ| Pages[GitHub Pages]
  Dev -.->|検討中| BE[backend/ - ZIO + zio-http（構想段階、未連携）]
```

## フロントエンド構成図

```
frontend/
├─ package.json
├─ vite.config.ts
├─ resources/ (sitemap・robots・cat assets)
├─ src/
│  ├─ pages/ (Vike ルーティング)
│  │  ├─ +Layout.tsx
│  │  ├─ +Head.tsx
│  │  ├─ +config.ts
│  │  ├─ index/
│  │  ├─ articles/
│  │  ├─ projects/
│  │  │  ├─ +Page.tsx
│  │  │  └─ @id/ (+Page.tsx, +onBeforePrerenderStart.ts など)
│  │  ├─ schedules/
│  │  └─ electricity/
│  ├─ components/ (project/headertags/articles など UI)
│  ├─ data/
│  ├─ assets/
│  ├─ domains/
│  ├─ hooks/
│  ├─ utils/
│  └─ types/
└─ tests/ (Vitest/Playwright)
   └─ e2e/
```
