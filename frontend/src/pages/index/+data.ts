import { fetchAllArticlesWithLimit, type Article } from "@/utils/rss";
import { getAllSlides, type Slide } from "@/utils/slides";

export type Data = {
  articles: Article[];
  latestSlides: Slide[];
};

const LATEST_SLIDES_LIMIT = 4;

export default async function data(): Promise<Data> {
  const articles = await fetchAllArticlesWithLimit(6);
  const latestSlides = getAllSlides()
    .filter((slide) => Boolean(slide.date))
    .slice(0, LATEST_SLIDES_LIMIT);
  return {
    articles,
    latestSlides,
  };
}
