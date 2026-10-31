import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SplatoonGearPage from "@/pages/hobbies/splatoon/gear/+Page";

describe("SplatoonGearPage", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", window.location.pathname);
  });

  it("最初の構成の0以外のギアパワーだけを表示する", () => {
    render(<SplatoonGearPage />);

    expect(screen.getAllByRole("article")).toHaveLength(1);
    const article = screen.getByRole("article");
    expect(
      within(article).getByRole("heading", { level: 2 }),
    ).toHaveTextContent("オーダーマニューバー レプリカ");
    expect(within(article).getAllByRole("term")).toHaveLength(9);
    expect(
      within(article).queryByText("インク効率アップ（メイン）"),
    ).not.toBeInTheDocument();
    expect(
      within(article).getByText("復活時間短縮").parentElement,
    ).toHaveTextContent("復活時間短縮1.2");
    expect(
      within(screen.getByRole("region", { name: /フク専用/ })).getByText(
        "なし",
      ),
    ).toBeInTheDocument();
  });

  it("ボタンを押すと画像とギアパワーが選択した構成に切り替わる", () => {
    render(<SplatoonGearPage />);

    const galButton = screen.getByRole("button", { name: "05 .52ガロン" });
    fireEvent.click(galButton);

    expect(window.location.hash).toBe("#52gal");
    expect(galButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", {
        name: "01 オーダーマニューバー レプリカ（復活時間短縮）",
      }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    const article = screen.getByRole("article");
    expect(
      within(article).getByRole("heading", { level: 2 }),
    ).toHaveTextContent(".52ガロン");
    expect(within(article).getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("splatoon5.png"),
    );
    expect(
      within(article).getByText("イカダッシュ速度アップ").parentElement,
    ).toHaveTextContent("イカダッシュ速度アップ1.5");
    expect(within(article).queryByText("復活時間短縮")).not.toBeInTheDocument();
    expect(within(article).getAllByRole("term")).toHaveLength(7);
    expect(
      within(screen.getByRole("region", { name: /アタマ専用/ })).getByText(
        "なし",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("region")).toHaveLength(4);
  });

  it("ハッシュ付きURLを開くと指定された構成を表示する", () => {
    window.history.replaceState(null, "", "#nzap85");

    render(<SplatoonGearPage />);

    expect(screen.getByRole("button", { name: "03 N-ZAP85" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "N-ZAP85",
    );
  });

  it("オーダースピナー レプリカの構成を表示する", () => {
    window.history.replaceState(null, "", "#splatling");

    render(<SplatoonGearPage />);

    const article = screen.getByRole("article");
    expect(
      within(article).getByRole("heading", { level: 2 }),
    ).toHaveTextContent("オーダースピナー レプリカ");
    expect(within(article).getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("splatoon6.png"),
    );
    expect(
      within(article).getByText("ヒト移動速度アップ").parentElement,
    ).toHaveTextContent("ヒト移動速度アップ2.0");
    expect(
      within(screen.getByRole("region", { name: /クツ専用/ })).getByText(
        "対物攻撃力アップ",
      ).parentElement,
    ).toHaveTextContent("対物攻撃力アップ1.0");
    expect(within(article).getAllByRole("term")).toHaveLength(7);
  });

  it("履歴移動などでハッシュが変わると表示を同期する", () => {
    window.history.replaceState(null, "", "#52gal");
    render(<SplatoonGearPage />);

    window.history.replaceState(null, "", "#slosher");
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "オーダースロッシャー レプリカ",
    );

    window.history.replaceState(null, "", window.location.pathname);
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "オーダーマニューバー レプリカ",
    );
  });

  it("存在しないハッシュは最初の構成を表示する", () => {
    window.history.replaceState(null, "", "#unknown-gear");

    render(<SplatoonGearPage />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "オーダーマニューバー レプリカ",
    );
  });
});
