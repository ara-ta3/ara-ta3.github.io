import React from "react";
import { HeadingTitle } from "@/components/Heading";
import type { Article } from "@/utils/rss";

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  return (
    <div id="articles" className="py-4">
      <div className="flex items-center justify-between mb-4">
        <HeadingTitle title="記事" />
        <a
          href="/articles"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 transition-colors"
        >
          すべて見る
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      {articles.map((article) => (
        <a href={article.link} target="_blank" key={article.link}>
          <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between hover:shadow-lg transition-all duration-200">
            <div className="flex flex-col justify-center">
              <p className="text-primary-700 text-base font-medium">
                {article.title}
              </p>
              <div className="flex items-center gap-2 text-primary-900 text-sm font-normal">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    article.source === "hatena"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {article.source === "hatena" ? "はてなブログ" : "Zenn"}
                </span>
                <span>•</span>
                <span>{article.pubDate.toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
            <div className="shrink-0">
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
        </a>
      ))}
    </div>
  );
};

export default RelatedArticles;
