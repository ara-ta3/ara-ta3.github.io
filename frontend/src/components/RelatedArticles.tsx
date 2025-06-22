import React from "react";
import { HeadingTitle } from "@/components/Heading";

const RelatedArticles: React.FC = () => {
  const articles = [
    {
      name: "TypeScript + Vike + SSG Getting Started",
      description: "Vikeを使った静的サイト生成について",
      href: "https://zenn.dev/ara_ta3/articles/typescript-vike-ssg-getting-started",
    },
    {
      name: "猫のカロリー計算ツールの開発",
      description: "ペットの健康管理アプリケーション開発記",
      href: "https://arata.hatenadiary.com/entry/2025/01/09/174000",
    },
    {
      name: "動的ルーティングでのSSG実装",
      description: "メタ情報を含む静的サイト生成のノウハウ",
      href: "https://zenn.dev/ara_ta3/articles/typescript-vike-ssg-with-dynamic-routing",
    },
  ];

  return (
    <div id="articles">
      <HeadingTitle title="記事" />
      {articles.map((article) => (
        <a href={article.href} target="_blank" key={article.name}>
          <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between hover:shadow-lg transition-all duration-200">
            <div className="flex flex-col justify-center">
              <p className="text-primary-700 text-base font-medium">
                {article.name}
              </p>
              <p className="text-primary-900 text-sm font-normal">
                {article.description}
              </p>
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
