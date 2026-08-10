import React from "react";
import { useData } from "vike-react/useData";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import ArticleCard from "@/components/articles/ArticleCard";
import MonthlyArticleChart from "@/components/articles/MonthlyArticleChart";
import PopularArticles from "@/components/articles/PopularArticles";
import YearlyArticleSummary from "@/components/articles/YearlyArticleSummary";
import type { Data } from "@/pages/articles/+data";

const ArticlesPage: React.FC = () => {
  const { articles, popularArticles, yearlyStats, monthlyStats } =
    useData<Data>();

  return (
    <>
      <BreadcrumbWithSchema pathname="/articles/" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-900">記事一覧</h1>
        <p className="text-primary-500 mt-2">
          はてなブログ・Zenn・企業ブログ で投稿した記事をまとめて表示しています
        </p>
      </div>
      <YearlyArticleSummary stats={yearlyStats} />
      <MonthlyArticleChart stats={monthlyStats} />
      <PopularArticles articles={popularArticles} />
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-1">
          すべての記事
        </h2>
        <p className="text-primary-500 text-sm mb-4">
          新しい順に{articles.length}本
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
        </div>
        {articles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-primary-500">記事が見つかりませんでした。</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ArticlesPage;
