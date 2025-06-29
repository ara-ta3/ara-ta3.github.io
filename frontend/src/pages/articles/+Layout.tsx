import React from "react";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { useBreadcrumbStore } from "@/stores/breadcrumbStore";

interface LayoutProps {
  children: React.ReactNode;
}

const ArticlesLayout: React.FC<LayoutProps> = ({ children }) => {
  const items = useBreadcrumbStore((state) => state.items);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-4">
          <div className="flex flex-col max-w-[960px] flex-1">
            {items.length > 0 && <Breadcrumb items={items} />}
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlesLayout;