import React from "react";

interface ScreenshotGalleryProps {
  screenshots: string[];
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  screenshots,
}) => {
  if (screenshots.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Screenshots
      </h3>
      <div className="flex w-full grow bg-white @container p-4">
        <div className="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] rounded-lg grid grid-cols-[2fr_1fr_1fr]">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className={`w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none ${
                index === 0 ? "row-span-2" : "col-span-2 row-span-2"
              }`}
              style={{ backgroundImage: `url("${screenshot}")` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenshotGallery;
