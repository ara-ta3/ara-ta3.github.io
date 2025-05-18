import React from "react";

import Projects from "@/components/Projects";
import Links from "@/components/Links";
import RelatedArticles from "@/components/RelatedArticles";
import { Tooltip } from "flowbite-react";

const PortfolioTop: React.FC = () => {
  return (
    <div className="h-[16vh] flex items-center justify-center bg-background">
      <div className="text-center justify-center">
        <h1 className="text-5xl font-bold text-primary-500 underline hover:text-secondary-500 flex justify-center">
          <Tooltip
            content={"Xに飛びます"}
            placement="top"
            className="block text-center"
          >
            <a href="https://x.com/ara_ta3" target="_blank">
              ara-ta3
            </a>
          </Tooltip>
        </h1>
        <p className="text-lg text-primary-700 mt-4">
          portfolioのように見える遊び場です
        </p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <PortfolioTop />
      <Projects />
      <RelatedArticles />
      <Links />
    </>
  );
};

export default Home;
