#!/usr/bin/env bash
# Playwright の baseline snapshot (`*-chromium-linux.png`) を Linux 環境で生成するためのヘルパ。
# Playwright 公式 docker image (ubuntu-jammy) 内から `make test/e2e/update/docker` 経由で呼ばれる想定。
# CI (ubuntu-latest) とほぼ同じ環境になるため、mac などローカル環境からでも CI と一致する baseline を得られる。
set -euo pipefail

# 作業ディレクトリはリポジトリ root (docker で -v によって /work に bind されている想定)
cd "$(dirname "$0")/.."

apt-get update >/dev/null
# fonts-noto-cjk は日本語を描画するのに必要 (CI と同じ)
# make は build 自動化に必要
apt-get install -y --no-install-recommends make fonts-noto-cjk >/dev/null

corepack enable
pnpm install --frozen-lockfile

# marp/image は OGP 用 PNG を puppeteer+Chrome で生成するが、Playwright docker image の
# Chrome パスを marp-cli が見つけられず失敗するため、テストに必要な HTML だけ先に作る。
pnpm -C frontend exec vike build
make marp

# Playwright の webServer (make server/build) は marp/image まで走らせてしまうので、
# ここで事前に serve を立てておき `reuseExistingServer` で使い回す。
# CI=true だと reuseExistingServer が false になるので env -u CI で外して走らせる。
pnpm -C frontend exec serve dist/client -l 3000 >/tmp/serve.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" >/dev/null 2>&1 || true' EXIT

for _ in $(seq 1 30); do
  if curl -sf http://localhost:3000/slides/ara-ta3-theme-showcase >/dev/null; then
    break
  fi
  sleep 1
done

env -u CI pnpm -C frontend exec playwright test --update-snapshots
