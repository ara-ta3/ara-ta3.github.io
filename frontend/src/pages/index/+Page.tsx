import React from "react";

import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import RelatedArticles from "@/components/RelatedArticles";
import Contact from "@/components/Links";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Profile />
            <Projects />
            <Skills />
            <RelatedArticles />
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
