import { describe, expect, test } from "vitest";
import { compareSlides, parseSlideSource, type Slide } from "@/utils/slides";

describe("parseSlideSource", () => {
  test("extracts title, description, image, date, and event info", () => {
    const source = `---\nmarp: true\ntitle: AI時代のコードレビュー\ndescription: AI Agent時代の話\nimage: https://example.com/cover.png\neventName: AI時代のコードレビューLT会\neventUrl: https://example.com/event/1\n---\n\n# 本文`;
    const slide = parseSlideSource("2026-04-22-ai-era-code-review", source);
    expect(slide).toEqual({
      slug: "2026-04-22-ai-era-code-review",
      title: "AI時代のコードレビュー",
      description: "AI Agent時代の話",
      image: "https://example.com/cover.png",
      date: "2026-04-22",
      url: "/slides/2026-04-22-ai-era-code-review.html",
      eventName: "AI時代のコードレビューLT会",
      eventUrl: "https://example.com/event/1",
    });
  });

  test("falls back to slug when title is missing", () => {
    const source = `# heading only`;
    const slide = parseSlideSource("no-frontmatter", source);
    expect(slide.title).toBe("no-frontmatter");
    expect(slide.description).toBeUndefined();
    expect(slide.image).toBeUndefined();
    expect(slide.date).toBeUndefined();
    expect(slide.url).toBe("/slides/no-frontmatter.html");
  });

  test("strips surrounding quotes from values", () => {
    const source = `---\ntitle: "quoted title"\ndescription: 'single quoted'\n---`;
    const slide = parseSlideSource("slug", source);
    expect(slide.title).toBe("quoted title");
    expect(slide.description).toBe("single quoted");
  });
});

describe("compareSlides", () => {
  const make = (slug: string, date?: string, title = slug): Slide => ({
    slug,
    title,
    date,
    url: `/slides/${slug}.html`,
  });

  test("sorts dated slides in descending order", () => {
    const slides = [make("a", "2025-01-01"), make("b", "2026-04-22")];
    slides.sort(compareSlides);
    expect(slides.map((s) => s.slug)).toEqual(["b", "a"]);
  });

  test("places dated slides before undated ones", () => {
    const slides = [make("undated"), make("dated", "2026-01-01")];
    slides.sort(compareSlides);
    expect(slides.map((s) => s.slug)).toEqual(["dated", "undated"]);
  });

  test("sorts undated slides by title", () => {
    const slides = [
      make("b", undefined, "B title"),
      make("a", undefined, "A title"),
    ];
    slides.sort(compareSlides);
    expect(slides.map((s) => s.slug)).toEqual(["a", "b"]);
  });
});
