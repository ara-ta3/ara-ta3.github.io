import React from "react";
import { useData } from "vike-react/useData";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import type { Data } from "@/pages/articles/+data";
import type { Article } from "@/utils/rss";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer">
      <div className="bg-white border border-secondary-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 h-[200px] flex flex-col overflow-hidden">
        <div className="flex items-start justify-between flex-1 min-w-0">
          <div className="flex-1 flex flex-col min-w-0">
            <h3 className="text-xl font-bold text-primary-700 mb-2 line-clamp-2 break-words">
              {article.title}
            </h3>
            {article.contentSnippet && (
              <p className="text-primary-500 text-sm mb-4 line-clamp-3 flex-1 break-words">
                {article.contentSnippet}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm mt-auto flex-wrap">
              <span
                className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
                  article.source === "hatena"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {article.source === "hatena" ? "はてなブログ" : "Zenn"}
              </span>
              <span className="text-primary-500 flex-shrink-0">•</span>
              <span className="text-primary-500 break-words">
                {article.pubDate.toLocaleDateString("ja-JP")}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="text-primary-900 flex size-8 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const ArticlesPage: React.FC = () => {
  const { articles } = useData<Data>();

  return (
    <>
      <BreadcrumbWithSchema pathname="/articles/" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-900">記事一覧</h1>
        <p className="text-primary-500 mt-2">
          はてなブログとZennで投稿した記事をまとめて表示しています
        </p>
      </div>
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
