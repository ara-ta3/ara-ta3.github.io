# Playwright の baseline snapshot を CI (ubuntu-latest) と同じ Linux 環境で再生成するための image。
# mac などローカル環境から `make test/e2e/update/docker` 経由で使う想定。
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# - make: Makefile から build を走らせるため
# - fonts-noto-cjk: 日本語 (スライド本文) を描画するため
# - google-chrome-stable: marp/image の OGP PNG 生成で marp-cli (内部 puppeteer) が
#   Chrome を自動検出するため
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      make \
      fonts-noto-cjk \
      wget \
      gnupg \
      ca-certificates \
 && wget -qO /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
 && apt-get install -y --no-install-recommends /tmp/chrome.deb \
 && rm /tmp/chrome.deb \
 && rm -rf /var/lib/apt/lists/*

RUN corepack enable

WORKDIR /work

# デフォルトコマンド: 依存をインストールして Playwright で snapshot を更新する
CMD ["bash", "-lc", "pnpm install --frozen-lockfile && make test/e2e/update"]
