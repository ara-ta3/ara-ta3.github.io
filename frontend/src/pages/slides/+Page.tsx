import React from "react";
import { useData } from "vike-react/useData";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";
import SlideCard from "@/components/slides/SlideCard";
import type { Data } from "@/pages/slides/+data";

const SlidesPage: React.FC = () => {
  const { slides } = useData<Data>();

  return (
    <>
      <BreadcrumbWithSchema pathname="/slides/" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-900">スライド一覧</h1>
        <p className="text-primary-500 mt-2">
          登壇・勉強会などで作成した Marp スライドをまとめています
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <SlideCard key={slide.slug} slide={slide} />
        ))}
      </div>
      {slides.length === 0 && (
        <div className="text-center py-8">
          <p className="text-primary-500">スライドが見つかりませんでした。</p>
        </div>
      )}
    </>
  );
};

export default SlidesPage;
