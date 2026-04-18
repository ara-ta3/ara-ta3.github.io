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

const SlideEventLink: React.FC<{ name?: string; url?: string }> = ({
  name,
  url,
}) => {
  if (!url && !name) return null;
  const label = name || url;
  if (!url) {
    return (
      <p className="text-primary-500 text-sm mt-3 line-clamp-2 break-words">
        {label}
      </p>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 hover:text-primary-800 underline text-sm mt-3 line-clamp-2 break-words"
    >
      {label}
    </a>
  );
};

const SlideCard: React.FC<SlideCardProps> = ({ slide }) => {
  return (
    <article className="bg-white border border-secondary-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex h-full flex-col">
      <a
        href={slide.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${slide.title} を開く`}
      >
        <SlideCardThumbnail image={slide.image} title={slide.title} />
      </a>
      <div className="p-5 flex flex-1 flex-col min-w-0">
        <h2 className="text-xl font-bold text-primary-700 line-clamp-2 break-words">
          <a
            href={slide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {slide.title}
          </a>
        </h2>
        {slide.description && (
          <p className="text-primary-500 text-sm mt-2 line-clamp-3 break-words">
            {slide.description}
          </p>
        )}
        <SlideEventLink name={slide.eventName} url={slide.eventUrl} />
        {slide.date && (
          <p className="text-primary-500 text-sm mt-auto pt-4">{slide.date}</p>
        )}
      </div>
    </article>
  );
};

export default SlideCard;
