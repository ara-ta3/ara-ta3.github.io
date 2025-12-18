import { expect, test } from "@playwright/test";

const pages = [
  { path: "/projects/nekometry", label: "projects/nekometry" },
  { path: "/projects/personal-website", label: "projects/personal-website" },
];

test.describe("head タグの重複チェック", () => {
  for (const { path, label } of pages) {
    test(`${label} で title / meta description が1つだけである`, async ({
      page,
    }) => {
      await page.goto(path);

      const titles = await page.locator("title").allTextContents();
      const descriptions = await page
        .locator('meta[name="description"]')
        .evaluateAll((elements) =>
          elements.map((el) => el.getAttribute("content") ?? "")
        );

      expect(titles.length, `title tags: ${titles.join("\n")}`).toBe(1);
      expect(
        descriptions.length,
        `meta descriptions: ${descriptions.join("\n")}`
      ).toBe(1);
    });
  }
});
