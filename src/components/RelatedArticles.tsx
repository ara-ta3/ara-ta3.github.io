import React from "react";

const RelatedArticles: React.FC = () => {
  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold mb-2">Related Articles</h2>
      <ul>
        <li>
          <a href="https://zenn.dev/ara_ta3/articles/typescript-vike-ssg-getting-started" target="_blank" rel="noopener noreferrer">
            TypeScript + Vike + SSG Getting Started
          </a>
        </li>
        <li>
          <a href="https://arata.hatenadiary.com/entry/2025/01/09/174000" target="_blank" rel="noopener noreferrer">
            arata.hatenadiary.com - 2025/01/09
          </a>
        </li>
      </ul>
    </div>
  );
};

export default RelatedArticles;
