import React from "react";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-4">
          <div className="flex flex-col max-w-[960px] flex-1">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsLayout;
