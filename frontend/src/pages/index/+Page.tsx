import React from "react";
import { useData } from "vike-react/useData";

import Footer from "@/components/Footer";
import LatestSlides from "@/components/LatestSlides";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import RelatedArticles from "@/components/RelatedArticles";
import type { Data } from "@/pages/index/+data";

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <section className={`px-4 py-10 ${className}`}>
      <div className="mx-auto max-w-[960px]">{children}</div>
    </section>
  );
};

const Home: React.FC = () => {
  const { articles, latestSlides } = useData<Data>();
  return (
    <div
      className="flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col min-h-screen">
        <Section>
          <Profile />
        </Section>
        <Section className="bg-primary-50">
          <Projects />
        </Section>
        <Section>
          <RelatedArticles articles={articles} />
        </Section>
        <Section className="bg-primary-50">
          <LatestSlides slides={latestSlides} />
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
