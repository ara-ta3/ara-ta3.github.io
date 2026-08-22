import { expect, test, type Page } from "@playwright/test";

const readHeadMetadata = async (page: Page) =>
  page.locator("head").evaluate((head) => ({
    titles: Array.from(head.querySelectorAll("title"), (element) =>
      element.textContent?.trim(),
    ),
    descriptions: Array.from(
      head.querySelectorAll('meta[name="description"]'),
      (element) => element.getAttribute("content"),
    ),
    ogTitles: Array.from(
      head.querySelectorAll('meta[property="og:title"]'),
      (element) => element.getAttribute("content"),
    ),
    ogDescriptions: Array.from(
      head.querySelectorAll('meta[property="og:description"]'),
      (element) => element.getAttribute("content"),
    ),
  }));

test.describe("headタグ", () => {
  test("トップページに固有のtitleとdescriptionが1つずつある", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["ara-ta3の個人サイト | 技術記事・登壇資料・個人開発"],
      descriptions: [
        "ScalaやTypeScriptを中心にWeb開発をしているara-ta3の個人サイトです。技術記事、登壇資料、個人開発プロジェクト、趣味の記録をまとめています。",
      ],
      ogTitles: [],
      ogDescriptions: [],
    });
  });

  test("記事一覧に固有のtitleとdescriptionが1つずつある", async ({ page }) => {
    await page.goto("/articles/");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["技術記事一覧 | ara-ta3の個人サイト"],
      descriptions: [
        "ara-ta3がはてなブログ、Zenn、企業ブログなどで公開した技術記事の一覧です。Scala、TypeScript、開発組織やコードレビューに関する記事をまとめています。",
      ],
      ogTitles: ["技術記事一覧 | ara-ta3の個人サイト"],
      ogDescriptions: [
        "ara-ta3がはてなブログ、Zenn、企業ブログなどで公開した技術記事の一覧です。Scala、TypeScript、開発組織やコードレビューに関する記事をまとめています。",
      ],
    });
  });

  test("スライド一覧に固有のtitleとdescriptionが1つずつある", async ({
    page,
  }) => {
    await page.goto("/slides/");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["登壇資料・スライド一覧 | ara-ta3の個人サイト"],
      descriptions: [
        "ara-ta3がカンファレンスや勉強会で発表した登壇資料とスライドの一覧です。Scala、Web開発、コードレビューなどのテーマごとに公開資料をまとめています。",
      ],
      ogTitles: ["登壇資料・スライド一覧 | ara-ta3の個人サイト"],
      ogDescriptions: [
        "ara-ta3がカンファレンスや勉強会で発表した登壇資料とスライドの一覧です。Scala、Web開発、コードレビューなどのテーマごとに公開資料をまとめています。",
      ],
    });
  });

  test("個人開発一覧に固有のtitleとdescriptionが1つずつある", async ({
    page,
  }) => {
    await page.goto("/projects/");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["個人開発一覧 | ara-ta3の個人サイト"],
      descriptions: [
        "ara-ta3が開発したWebアプリケーションやツールの一覧です。使用技術、開発の背景、主な機能、公開先をプロジェクトごとに紹介しています。",
      ],
      ogTitles: ["個人開発一覧 | ara-ta3の個人サイト"],
      ogDescriptions: [
        "ara-ta3が開発したWebアプリケーションやツールの一覧です。使用技術、開発の背景、主な機能、公開先をプロジェクトごとに紹介しています。",
      ],
    });
  });

  test("Nekometry詳細に概要を使ったtitleとdescriptionが1つずつある", async ({
    page,
  }) => {
    await page.goto("/projects/nekometry");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["Nekometry | ara-ta3の個人サイト"],
      descriptions: [
        "猫の健康管理をサポートするカロリー計算ツールです。猫の体重、年齢、活動レベルに基づいて適切な一日の摂取カロリーを計算し、飼い主がペットの健康状態を把握できるよう支援します。",
      ],
      ogTitles: ["Nekometry | ara-ta3の個人サイト"],
      ogDescriptions: [
        "猫の健康管理をサポートするカロリー計算ツールです。猫の体重、年齢、活動レベルに基づいて適切な一日の摂取カロリーを計算し、飼い主がペットの健康状態を把握できるよう支援します。",
      ],
    });
  });

  test("個人サイト詳細に固有のtitleとdescriptionが1つずつある", async ({
    page,
  }) => {
    await page.goto("/projects/personal-website");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["個人ウェブサイト(ara-ta3.github.io) | ara-ta3の個人サイト"],
      descriptions: [
        "ara-ta3の個人ポートフォリオサイトです。Vite、Vike、React、TypeScriptによるSSG構成で、技術記事、登壇資料、個人開発、趣味の記録を公開しています。",
      ],
      ogTitles: ["個人ウェブサイト(ara-ta3.github.io) | ara-ta3の個人サイト"],
      ogDescriptions: [
        "ara-ta3の個人ポートフォリオサイトです。Vite、Vike、React、TypeScriptによるSSG構成で、技術記事、登壇資料、個人開発、趣味の記録を公開しています。",
      ],
    });
  });

  test("趣味一覧に固有のtitleとdescriptionが1つずつある", async ({ page }) => {
    await page.goto("/hobbies/");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["趣味の記録 | ara-ta3の個人サイト"],
      descriptions: [
        "ara-ta3が好きなゲームや、継続している遊びの記録をまとめたページです。現在はSplatoon 3のXマッチにおけるシーズン別の最高XPと順位を掲載しています。",
      ],
      ogTitles: ["趣味の記録 | ara-ta3の個人サイト"],
      ogDescriptions: [
        "ara-ta3が好きなゲームや、継続している遊びの記録をまとめたページです。現在はSplatoon 3のXマッチにおけるシーズン別の最高XPと順位を掲載しています。",
      ],
    });
  });

  test("Splatoon詳細では親ページのheadを継承せず固有の値が1つずつある", async ({
    page,
  }) => {
    await page.goto("/hobbies/splatoon/");

    await expect(readHeadMetadata(page)).resolves.toEqual({
      titles: ["Splatoon 3のXマッチ記録 | ara-ta3の個人サイト"],
      descriptions: [
        "ara-ta3のSplatoon 3プレイ記録です。Xマッチのルール別・シーズン別の最高XPと最終順位を、推移グラフや一覧表とともに掲載しています。",
      ],
      ogTitles: ["Splatoon 3のXマッチ記録 | ara-ta3の個人サイト"],
      ogDescriptions: [
        "ara-ta3のSplatoon 3プレイ記録です。Xマッチのルール別・シーズン別の最高XPと最終順位を、推移グラフや一覧表とともに掲載しています。",
      ],
    });
  });
});
