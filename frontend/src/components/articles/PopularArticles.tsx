import React from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Article } from "@/domains/articles/articles";

type Props = {
  articles: Article[];
};

const PopularArticles: React.FC<Props> = ({ articles }) => {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-primary-900 mb-1">
        よく読まれた記事
      </h2>
      <p className="text-primary-500 text-sm mb-4">
        はてなブックマーク数の多い記事です
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.link} article={article} />
        ))}
      </div>
    </section>
  );
};

export default PopularArticles;
