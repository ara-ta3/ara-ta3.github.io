import React from "react";
import ArticleThumbnail from "@/components/articles/ArticleThumbnail";
import type { Article } from "@/utils/rss";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer">
      <article className="bg-white border border-secondary-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex h-full flex-col">
        <ArticleThumbnail
          title={article.title}
          url={article.thumbnailUrl}
          className="w-full aspect-video rounded-none"
        />
        <div className="p-5 flex flex-1 flex-col min-w-0">
          <h2 className="text-xl font-bold text-primary-700 line-clamp-2 break-words">
            {article.title}
          </h2>
          {article.contentSnippet && (
            <p className="text-primary-500 text-sm mt-2 line-clamp-3 break-words">
              {article.contentSnippet}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm mt-auto pt-4 flex-wrap">
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
      </article>
    </a>
  );
};

export default ArticleCard;
