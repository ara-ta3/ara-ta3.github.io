import React from "react";
import { useData } from "vike-react/useData";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import ArticleCard from "@/components/articles/ArticleCard";
import MonthlyArticleChart from "@/components/articles/MonthlyArticleChart";
import YearlyArticleSummary from "@/components/articles/YearlyArticleSummary";
import type { Data } from "@/pages/articles/+data";

const ArticlesPage: React.FC = () => {
  const { articles, yearlyStats, monthlyStats } = useData<Data>();

  return (
    <>
      <BreadcrumbWithSchema pathname="/articles/" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-900">記事一覧</h1>
        <p className="text-primary-500 mt-2">
          はてなブログとZennで投稿した記事をまとめて表示しています
        </p>
      </div>
      <YearlyArticleSummary stats={yearlyStats} />
      <MonthlyArticleChart stats={monthlyStats} />
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
    </>
  );
};

export default ArticlesPage;
