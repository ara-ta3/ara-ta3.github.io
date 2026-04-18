---
marp: true
theme: ara-ta3
paginate: true
size: 16:9
title: ara-ta3 スライドテーマ見本
description: ara-ta3 の Marp テーマで使える基本レイアウトをまとめた見本スライド
---

<style>
@import "./themes/ara-ta3.css";
</style>

<!-- _class: lead lead-profile -->
# ara-ta3 スライドテーマ見本

<div class="lead-profile-body">
  <div class="lead-copy">
    <p class="lead-tagline">タイトル、通常ページ、一言ページ、まとめページを<br />1本で確認できるようにした見本資料です。</p>
    <p class="lead-date">Theme showcase</p>
  </div>
  <div class="lead-aside">
    <img src="./assets/ara_ta3-avatar.jpeg" alt="ara_ta3 avatar" />
    <p class="lead-name">ara_ta3</p>
    <p class="lead-bio">ara-ta3 theme sample</p>
    <p class="lead-bio">Marp layout showcase</p>
    <p class="lead-link"><a href="https://ara-ta3.github.io/">ara-ta3.github.io</a></p>
  </div>
</div>

---

# この見本で確認できること

- 先頭で印象をつくるタイトルページ
- 箇条書きや本文を読む通常ページ
- 強いメッセージを短く置く一言ページ
- 要点を再整理するまとめページ

公開用の見本として置きつつ、
スタイル変更時のビジュアル回帰確認にも使える構成にしている。

---

<!-- _class: statement -->
# 情報量が変わっても

見え方の軸は揃えたい

---

<!-- _class: summary-overview -->
# 基本レイアウトの使い分け

<div class="summary-callout">
  <p>タイトルページは第一印象をつくる。</p>
  <p>通常ページは読みやすさを支える。</p>
  <p>一言ページとまとめページはメッセージの強弱を整える。</p>
</div>

| レイアウト | 主な役割 |
| --- | --- |
| タイトルページ | 話の入り口をつくる、登壇情報を見せる |
| 通常ページ | 情報を順番に説明する、箇条書きや本文を読む |
| 一言ページ | 流れを切り替える、強いメッセージを短く置く |
| まとめページ | 要点を再掲する、全体の理解を揃える |

---

# 引用と箇条書き

> 引用は primary トーンの左ボーダーと落ち着いた背景で置く。

1. 順序付きリストも同じ marker 色で並ぶ。
2. 情報の粒度ごとに表現を切り替える
3. 引用と本文の視線移動を整える

- 箇条書きは `::marker` 色と行間を統一
- 階層を増やしても同じ marker トーン

---

# コードと表

行内 `code` は低コントラストな背景で馴染ませる。ブロックの **コード** は角丸と影を付ける。

```bash
pnpm install
make test/e2e/slides
```

通常の **表** は `summary-overview` とは別のスタイルになる。

| 項目 | 意図 |
| --- | --- |
| 行内 code | 変数名や短いコマンドを強調せず置く |
| ブロック code | コマンドやスニペットを読みやすく置く |
| 通常 table | キー/バリューで対比する |

---

# 強調・リンク・小見出し

本文の **強調** と _斜体_ は primary-900 に寄せる。
リンクは [ara-ta3.github.io](https://ara-ta3.github.io/) のようにアンダーラインを薄く付ける。

## 小見出しとして h2 / h3 を使う

### さらに下の階層

段落と段落のリズムを崩さないように、見出しサイズとウェイトを整える。

---

<!-- _class: statement thanks -->
# ご清聴ありがとうございました
