import React from "react";
import { HeadingTitle } from "@/components/Heading";
import SlideCard from "@/components/slides/SlideCard";
import type { Slide } from "@/utils/slides";

interface LatestSlidesProps {
  slides: Slide[];
}

const LatestSlides: React.FC<LatestSlidesProps> = ({ slides }) => {
  if (slides.length === 0) return null;

  return (
    <div id="slides" className="py-4">
      <div className="flex items-center justify-between mb-4">
        <HeadingTitle title="最新スライド" />
        <a
          href="/slides"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-300 transition-colors"
        >
          すべて見る
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <SlideCard key={slide.slug} slide={slide} />
        ))}
      </div>
    </div>
  );
};

export default LatestSlides;
