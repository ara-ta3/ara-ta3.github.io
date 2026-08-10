ara-ta3の物置
---

https://ara-ta3.github.io/

## ディレクトリ構成

フロントエンドのコードは `frontend/` ディレクトリ以下に配置されています。pnpm のワークスペース機能を利用して管理しています。

## 技術構成図

```mermaid
graph TD
  Dev[DEV] -->|make build| FE[frontend/ - Vike + React + TS]
  FE --> Dist[frontend/dist/client]
  Dist -->|GitHub Actionsでデプロイ| Pages[GitHub Pages]
```

## フロントエンド構成図

```
frontend/
├─ package.json
├─ vite.config.ts
├─ resources/ (sitemap・robots)
├─ src/
│  ├─ pages/ (Vike ルーティング)
│  │  ├─ +Layout.tsx
│  │  ├─ +Head.tsx
│  │  ├─ +config.ts
│  │  ├─ index/
│  │  ├─ articles/
│  │  └─ projects/
│  │  │  ├─ +Page.tsx
│  │  │  └─ @id/ (+Page.tsx, +onBeforePrerenderStart.ts など)
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
