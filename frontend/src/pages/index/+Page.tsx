import React from "react";

import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import RelatedArticles from "@/components/RelatedArticles";
import Contact from "@/components/Links";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
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
            <RelatedArticles />
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
