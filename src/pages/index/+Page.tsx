import React from "react";

import Tools from "../../components/Tools";
import Links from "../../components/Links";

const PortfolioTop: React.FC = () => {
  return (
    <div className="h-[25vh] flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 underline">
          <a href="https://x.com/ara_ta3" target="_blank">
            ara-ta3
          </a>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
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
      <Tools />
      <Links />
    </>
  );
};

export default Home;
