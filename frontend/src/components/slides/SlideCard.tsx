import React from "react";
import type { Slide } from "@/utils/slides";

type SlideCardProps = {
  slide: Slide;
};

const SlideCardThumbnail: React.FC<{ image?: string; title: string }> = ({
  image,
  title,
}) => {
  if (image) {
    return (
      <div className="w-full aspect-video bg-secondary-50 overflow-hidden">
        <img
          src={image}
          alt={`${title} サムネイル`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      aria-label="サムネイル未設定"
      className="w-full aspect-video border-b border-secondary-100 bg-secondary-50"
    />
  );
};

const SlideCard: React.FC<SlideCardProps> = ({ slide }) => {
  return (
    <a href={slide.url} target="_blank" rel="noopener noreferrer">
      <article className="bg-white border border-secondary-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex h-full flex-col">
        <SlideCardThumbnail image={slide.image} title={slide.title} />
        <div className="p-5 flex flex-1 flex-col min-w-0">
          <h2 className="text-xl font-bold text-primary-700 line-clamp-2 break-words">
            {slide.title}
          </h2>
          {slide.description && (
            <p className="text-primary-500 text-sm mt-2 line-clamp-3 break-words">
              {slide.description}
            </p>
          )}
          {slide.date && (
            <p className="text-primary-500 text-sm mt-auto pt-4">
              {slide.date}
            </p>
          )}
        </div>
      </article>
    </a>
  );
};

export default SlideCard;
