import { fetchAllArticlesWithLimit, type Article } from "@/utils/rss";

export type Data = {
  articles: Article[];
};

export default async function data(): Promise<Data> {
  const articles = await fetchAllArticlesWithLimit(6);
  return {
    articles,
  };
}
