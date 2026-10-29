import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SplatoonGearPage from "@/pages/hobbies/splatoon/gear/+Page";

describe("SplatoonGearPage", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", window.location.pathname);
  });

  it("最初の構成だけを表示し、未装備を含む全26種類を並べる", () => {
    render(<SplatoonGearPage />);

    expect(screen.getAllByRole("article")).toHaveLength(1);
    const article = screen.getByRole("article");
    expect(
      within(article).getByRole("heading", { level: 2 }),
    ).toHaveTextContent("オーダーマニューバー レプリカ");
    expect(within(article).getAllByRole("term")).toHaveLength(26);
    expect(
      within(article).getByText("インク効率アップ（メイン）").parentElement,
    ).toHaveTextContent("インク効率アップ（メイン）0.0");
    expect(
      within(article).getByText("復活時間短縮").parentElement,
    ).toHaveTextContent("復活時間短縮1.2");
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
    expect(
      within(article).getByText("復活時間短縮").parentElement,
    ).toHaveTextContent("復活時間短縮0.0");
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
