import React from "react";
import { Card } from "flowbite-react";

const RelatedArticles: React.FC = () => {
  const articles = [
    {
      name: "TypeScript + Vike + SSG Getting Started",
      href: "https://zenn.dev/ara_ta3/articles/typescript-vike-ssg-getting-started",
    },
    {
      name: "猫にあげる1日の餌のカロリー量とフードのグラム数を計算出来るツールを書いた",
      href: "https://arata.hatenadiary.com/entry/2025/01/09/174000",
    },
    {
      name: "TypeScript + Vite + Vikeの動的ルーティングのページにメタ情報を含めてSSGする",
      href: "https://zenn.dev/ara_ta3/articles/typescript-vike-ssg-with-dynamic-routing",
    },
  ];
  return (
    <section id="related-articles" className="py-8 bg-base">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary-500">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {articles.map((article) => (
            <a key={article.name} href={article.href} target="_blank">
              <Card className="w-full h-36">
                <h5 className="text-base md:text-lg font-bold text-primary-700">
                  {article.name}
                </h5>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
