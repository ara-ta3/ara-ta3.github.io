import fs from "node:fs";
import path from "node:path";

export type Slide = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  date?: string;
  url: string;
};

const getSlidesDir = (): string => path.resolve(process.cwd(), "../slides");

const parseFrontmatter = (source: string): Record<string, string> => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[m[1]] = value;
  }
  return result;
};

const extractDateFromFilename = (slug: string): string | undefined => {
  const m = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : undefined;
};

export const parseSlideSource = (slug: string, source: string): Slide => {
  const fm = parseFrontmatter(source);
  return {
    slug,
    title: fm.title || slug,
    description: fm.description || undefined,
    image: fm.image || undefined,
    date: extractDateFromFilename(slug),
    url: `/slides/${slug}.html`,
  };
};

export const compareSlides = (a: Slide, b: Slide): number => {
  if (a.date && b.date) return b.date.localeCompare(a.date);
  if (a.date) return -1;
  if (b.date) return 1;
  return a.title.localeCompare(b.title, "ja");
};

export const getAllSlides = (): Slide[] => {
  const dir = getSlidesDir();
  const files = fs.readdirSync(dir).filter((name) => name.endsWith(".md"));

  const slides = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const source = fs.readFileSync(path.join(dir, file), "utf-8");
    return parseSlideSource(slug, source);
  });

  slides.sort(compareSlides);
  return slides;
};
