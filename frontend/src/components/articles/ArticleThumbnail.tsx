import React from "react";

type ArticleThumbnailProps = {
  title: string;
  url?: string;
  className?: string;
};

const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
  title,
  url,
  className,
}) => {
  const classes = ["rounded-md border border-secondary-200 bg-secondary-100", className]
    .filter(Boolean)
    .join(" ");

  if (url) {
    return (
      <img
        src={url}
        alt={`${title}のサムネイル`}
        className={`${classes} object-cover`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`${classes} flex items-center justify-center text-secondary-400`}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="size-6"
        fill="currentColor"
      >
        <path d="M216,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,64H216V192H40ZM168,116a12,12,0,1,1-12-12A12,12,0,0,1,168,116Zm44,60H44l44-48,28,32,20-24,76,88Z" />
      </svg>
    </div>
  );
};

export default ArticleThumbnail;
