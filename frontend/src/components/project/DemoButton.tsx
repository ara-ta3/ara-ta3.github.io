import React from "react";

interface DemoButtonProps {
  demoUrl?: string;
  buttonText?: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({
  demoUrl,
  buttonText = "View Demo",
}) => {
  if (!demoUrl) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-primary-900 text-xl font-bold leading-tight px-4 py-4">
        Demo
      </h2>
      <div className="flex px-4 justify-start">
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-700 text-white text-sm font-bold leading-normal hover:bg-primary-500 transition-colors"
        >
          <span className="truncate">{buttonText}</span>
        </a>
      </div>
    </div>
  );
};

export default DemoButton;
