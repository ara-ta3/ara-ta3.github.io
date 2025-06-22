import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/project/ProjectHeader";
import TechnologiesSection from "@/components/project/TechnologiesSection";
import ProjectDetails from "@/components/project/ProjectDetails";
import ScreenshotGallery from "@/components/project/ScreenshotGallery";
import DemoButton from "@/components/project/DemoButton";

const ProjectPage: React.FC = () => {
  const projectData = {
    title: "Project: 個人ウェブサイト（ara-ta3.github.io）",
    description:
      "Vikeを使用したモダンな静的サイト生成による個人ポートフォリオサイト",
    overview:
      "このプロジェクトは、最新のWebテクノロジーを活用して構築された個人ポートフォリオサイトです。Vikeフレームワークを使用した静的サイト生成により、高速でSEOに優れたWebサイトを実現しています。RSSフィード統合、レスポンシブデザイン、GitHub Pagesでの自動デプロイなど、現代的な開発手法を取り入れています。",
    technologies: [
      "Vike",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Flowbite",
      "RSS Parser",
      "Vitest",
      "ESLint",
      "Prettier",
      "GitHub Actions",
    ],
    details: [
      { label: "Project Type", value: "個人ポートフォリオサイト" },
      { label: "Duration", value: "継続開発中" },
      { label: "Team Size", value: "1名" },
      { label: "My Role", value: "フルスタック開発者" },
      { label: "Deployment", value: "GitHub Pages" },
      { label: "CI/CD", value: "GitHub Actions" },
    ],
    screenshots: [],
    demoUrl: "https://ara-ta3.github.io",
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <ProjectHeader
              title={projectData.title}
              description={projectData.description}
              overview={projectData.overview}
            />
            <TechnologiesSection technologies={projectData.technologies} />
            <ProjectDetails details={projectData.details} />
            <ScreenshotGallery screenshots={projectData.screenshots} />
            <DemoButton
              demoUrl={projectData.demoUrl}
              buttonText="サイトを見る"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;
