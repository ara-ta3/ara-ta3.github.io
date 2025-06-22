import React from "react";

interface ScreenshotGalleryProps {
  imageUrl?: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ imageUrl }) => {
  if (imageUrl === undefined) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Image
      </h3>
      <div className="flex w-full grow bg-white @container p-4">
        <div className="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] rounded-lg grid grid-cols-[2fr_1fr_1fr]">
          <img
            src={imageUrl}
            alt="Project Image"
            className="w-full rounded-lg mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ScreenshotGallery;
