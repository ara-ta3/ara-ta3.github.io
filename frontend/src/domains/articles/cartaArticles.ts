import type { Article } from "@/utils/rss";

// CARTA TECH BLOG (techblog.cartaholdings.co.jp) の id:arata3da4 名義の記事。
// これ以上増えないためコード上に保持する。bookmarkCount は取得できなかった場合の
// フォールバック値で、ビルド時に最新のはてなブックマーク数で上書きされる。
export const CARTA_ARTICLES: Article[] = [
  {
    title:
      "サポーターズの「1dayスピード選考会」開発：教科書通りのスクラムから、自分たちの「型」を作るまで",
    link: "https://techblog.cartaholdings.co.jp/entry/2025/12/05/120500",
    pubDate: new Date("2025-12-05T12:05:00+09:00"),
    contentSnippet:
      "「1dayスピード選考会」のシステム化という、およそ半年間のプロジェクトで実践した開発プロセスとその裏側の試行錯誤について。",
    source: "carta",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/n/namu_r21/20251205/20251205121159.png",
    bookmarkCount: 1,
  },
  {
    title:
      "AIの登場によりWebエンジニアの仕事はなくなるのか - Coding with AI: The End of Software Development as We Know Itを見て",
    link: "https://techblog.cartaholdings.co.jp/entry/will-emergence-aI-eliminate-jobs-web-engineers",
    pubDate: new Date("2025-06-11T10:56:48+09:00"),
    contentSnippet:
      "AIの登場によりWebエンジニアの仕事はなくなるのかという問いに思いを馳せた記事。現役Webエンジニアやこれから目指す学生向け。",
    source: "carta",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/c/carta_engineers/20250610/20250610175139.png",
    bookmarkCount: 66,
  },
  {
    title: "サポーターズで1on1イベントをフルサイクル開発した話",
    link: "https://techblog.cartaholdings.co.jp/entry/2023/12/22/160000",
    pubDate: new Date("2023-12-22T16:00:00+09:00"),
    contentSnippet:
      "CARTA TECH BLOG アドベントカレンダー 12/22 の記事。サポーターズで1on1イベントをフルサイクル開発した話。",
    source: "carta",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/a/arata3da4/20231222/20231222154116.png",
    bookmarkCount: 2,
  },
  {
    title:
      "CTOからの挑戦状2016 2ndを手伝った際に書いたPythonコードを晒してみる。",
    link: "https://techblog.cartaholdings.co.jp/entry/2016/12/11/202517",
    pubDate: new Date("2016-12-11T20:25:17+09:00"),
    contentSnippet:
      "VOYAGE GROUP の Advent Calendar 2016 11日目の記事。CTOからの挑戦状2016 2ndを手伝った際に書いたPythonコードの紹介。",
    source: "carta",
    thumbnailUrl:
      "https://cdn-ak.f.st-hatena.com/images/fotolife/a/arata3da4/20161214/20161214141155.png",
    bookmarkCount: 8,
  },
];
