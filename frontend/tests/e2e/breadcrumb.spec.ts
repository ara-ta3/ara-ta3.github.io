import { test, expect } from "@playwright/test";

// ヘルパー関数：BreadcrumbListスキーマを取得
async function getBreadcrumbSchema(page) {
  const jsonLdScript = page.locator('script[type="application/ld+json"]');
  await expect(jsonLdScript).toBeAttached();

  const schemaContent = await jsonLdScript.textContent();
  const schema = JSON.parse(schemaContent || "{}");

  expect(schema["@type"]).toBe("BreadcrumbList");
  return schema;
}

test.describe("パンくずリストのJSON+LDスキーマテスト", () => {
  test("個人開発ページにパンくずリストのJSON+LDスキーマが存在する", async ({
    page,
  }) => {
    await page.goto("/projects/");

    const schema = await getBreadcrumbSchema(page);
    expect(schema.itemListElement.length).toBe(2);
    expect(schema.itemListElement[1].name).toBe("個人開発");
  });

  test("記事一覧ページにパンくずリストのJSON+LDスキーマが存在する", async ({
    page,
  }) => {
    await page.goto("/articles/");

    const schema = await getBreadcrumbSchema(page);
    expect(schema.itemListElement.length).toBe(2);
    expect(schema.itemListElement[1].name).toBe("記事一覧");
  });

  test("個人開発詳細ページ（personal-website）にパンくずリストのJSON+LDスキーマが存在する", async ({
    page,
  }) => {
    await page.goto("/projects/personal-website");

    const schema = await getBreadcrumbSchema(page);
    expect(schema.itemListElement.length).toBe(3);
    expect(schema.itemListElement[2].name).toBe(
      "個人ウェブサイト(ara-ta3.github.io)",
    );
  });

  test("個人開発詳細ページ（nekometry）にパンくずリストのJSON+LDスキーマが存在する", async ({
    page,
  }) => {
    await page.goto("/projects/nekometry");

    const schema = await getBreadcrumbSchema(page);
    expect(schema.itemListElement.length).toBe(3);
    expect(schema.itemListElement[2].name).toBe("Nekometry");
  });

  test("トップページにはパンくずリストのJSON+LDスキーマが存在しない", async ({
    page,
  }) => {
    await page.goto("/");

    // JSON+LDスキーマは存在するが、BreadcrumbListタイプのスキーマは存在しないことを確認
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();

    let foundBreadcrumbList = false;
    for (let i = 0; i < count; i++) {
      const scriptContent = await jsonLdScripts.nth(i).textContent();
      const schema = JSON.parse(scriptContent || "{}");
      if (schema["@type"] === "BreadcrumbList") {
        foundBreadcrumbList = true;
        break;
      }
    }

    expect(foundBreadcrumbList).toBe(false);
  });
});
