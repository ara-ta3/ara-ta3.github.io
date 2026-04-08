import { expect, test, type Locator, type Page } from "@playwright/test";

const slidePath = "/slides/ara-ta3-theme-showcase.html";

type SlideCase = {
  id: string;
  screenshot: string;
  className?: string;
  heading: string;
  texts: string[];
};

const slideCases: SlideCase[] = [
  {
    id: "1",
    screenshot: "ara-ta3-theme-showcase-lead-profile.png",
    className: "lead lead-profile",
    heading: "ara-ta3 スライドテーマ見本",
    texts: ["Theme showcase", "Marp layout showcase"],
  },
  {
    id: "2",
    screenshot: "ara-ta3-theme-showcase-regular.png",
    heading: "この見本で確認できること",
    texts: [
      "先頭で印象をつくるタイトルページ",
      "スタイル変更時のビジュアル回帰確認にも使える構成にしている。",
    ],
  },
  {
    id: "3",
    screenshot: "ara-ta3-theme-showcase-statement.png",
    className: "statement",
    heading: "情報量が変わっても",
    texts: ["見え方の軸は揃えたい"],
  },
  {
    id: "4",
    screenshot: "ara-ta3-theme-showcase-summary-overview.png",
    className: "summary-overview",
    heading: "基本レイアウトの使い分け",
    texts: [
      "タイトルページは第一印象をつくる。",
      "通常ページ",
      "まとめページ",
    ],
  },
];

test.use({
  viewport: {
    width: 1280,
    height: 720,
  },
});

async function prepareSlide(page: Page, id: string): Promise<Locator> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${slidePath}#${id}`);
  await page.waitForLoadState("networkidle");
  await page.addStyleTag({
    content: `
      .bespoke-marp-osc,
      .bespoke-progress-parent,
      .bespoke-marp-note {
        display: none !important;
      }

      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const slide = page.locator(`section[id="${id}"]`);

  await expect(slide).toBeVisible();
  await expect(slide).toHaveAttribute("data-size", "16:9");

  return slide;
}

test.describe("公開用スライド見本のビジュアル回帰", () => {
  for (const slideCase of slideCases) {
    test(`${slideCase.heading} が意図した表示である`, async ({ page }) => {
      const slide = await prepareSlide(page, slideCase.id);

      if (slideCase.className) {
        await expect(slide).toHaveClass(new RegExp(`\\b${slideCase.className.replace(" ", "\\s+")}\\b`));
      } else {
        await expect(slide).not.toHaveAttribute("class", /./);
      }

      await expect(slide.getByRole("heading", { name: slideCase.heading })).toBeVisible();

      for (const text of slideCase.texts) {
        await expect(slide).toContainText(text);
      }

      await expect(slide).toHaveScreenshot(slideCase.screenshot, {
        animations: "disabled",
        caret: "hide",
        scale: "css",
      });
    });
  }
});
