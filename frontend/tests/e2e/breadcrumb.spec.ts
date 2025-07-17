import { test, expect } from '@playwright/test';

test.describe('パンくずリストのJSON+LDスキーマテスト', () => {
  test('プロジェクトページにパンくずリストのJSON+LDスキーマが存在する', async ({ page }) => {
    await page.goto('/projects/');
    
    // JSON+LDスキーマのscriptタグが存在するかチェック
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
    
    // スキーマの内容を取得して検証
    const schemaContent = await jsonLdScript.textContent();
    const schema = JSON.parse(schemaContent || '{}');
    
    // BreadcrumbListスキーマの基本構造を確認
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toBeInstanceOf(Array);
    expect(schema.itemListElement.length).toBe(2);
    
    // 各アイテムの構造を確認
    const homeItem = schema.itemListElement[0];
    expect(homeItem['@type']).toBe('ListItem');
    expect(homeItem.position).toBe(1);
    expect(homeItem.name).toBe('ホーム');
    expect(homeItem.item).toBe('https://ara-ta3.github.io/');
    
    const projectItem = schema.itemListElement[1];
    expect(projectItem['@type']).toBe('ListItem');
    expect(projectItem.position).toBe(2);
    expect(projectItem.name).toBe('プロジェクト');
    expect(projectItem.item).toBe('https://ara-ta3.github.io/projects/');
  });

  test('記事一覧ページにパンくずリストのJSON+LDスキーマが存在する', async ({ page }) => {
    await page.goto('/articles/');
    
    // JSON+LDスキーマのscriptタグが存在するかチェック
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
    
    // スキーマの内容を取得して検証
    const schemaContent = await jsonLdScript.textContent();
    const schema = JSON.parse(schemaContent || '{}');
    
    // BreadcrumbListスキーマの基本構造を確認
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toBeInstanceOf(Array);
    expect(schema.itemListElement.length).toBe(2);
    
    // 各アイテムの構造を確認
    const homeItem = schema.itemListElement[0];
    expect(homeItem['@type']).toBe('ListItem');
    expect(homeItem.position).toBe(1);
    expect(homeItem.name).toBe('ホーム');
    expect(homeItem.item).toBe('https://ara-ta3.github.io/');
    
    const articleItem = schema.itemListElement[1];
    expect(articleItem['@type']).toBe('ListItem');
    expect(articleItem.position).toBe(2);
    expect(articleItem.name).toBe('記事一覧');
    expect(articleItem.item).toBe('https://ara-ta3.github.io/articles/');
  });

  test('トップページにはパンくずリストのJSON+LDスキーマが存在しない', async ({ page }) => {
    await page.goto('/');
    
    // JSON+LDスキーマは存在するが、BreadcrumbListタイプのスキーマは存在しないことを確認
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    
    let foundBreadcrumbList = false;
    for (let i = 0; i < count; i++) {
      const scriptContent = await jsonLdScripts.nth(i).textContent();
      const schema = JSON.parse(scriptContent || '{}');
      if (schema['@type'] === 'BreadcrumbList') {
        foundBreadcrumbList = true;
        break;
      }
    }
    
    expect(foundBreadcrumbList).toBe(false);
  });
});