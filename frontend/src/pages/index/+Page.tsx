import React from "react";
import { useData } from "vike-react/useData";

import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import RelatedArticles from "@/components/RelatedArticles";
import Contact from "@/components/Links";
import Footer from "@/components/Footer";
import type { Data } from "@/pages/index/+data";

const Home: React.FC = () => {
  const { articles } = useData<Data>();
  return (
    <div
      className="flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col min-h-screen">
        <div className="px-4 flex flex-1 justify-center py-4">
          <div className="flex flex-col max-w-[960px] flex-1">
            <Profile />
            <Projects />
            <RelatedArticles articles={articles} />
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
