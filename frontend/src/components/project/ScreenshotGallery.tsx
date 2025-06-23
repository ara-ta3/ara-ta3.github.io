import React from "react";

interface ScreenshotGalleryProps {
  imageUrl?: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ imageUrl }) => {
  if (imageUrl === undefined) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-primary-900 text-xl font-bold leading-tight px-4 py-4">
        イメージ
      </h3>
      <div className="flex w-full grow bg-white @container p-4">
        <div className="w-full gap-1 overflow-hidden bg-white rounded-lg grid grid-cols-1">
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
