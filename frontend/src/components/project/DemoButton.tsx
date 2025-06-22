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
    <div className="flex flex-col gap-3">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Demo
      </h3>
      <div className="flex px-4 py-3 justify-start">
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0c77f2] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0a65d9] transition-colors"
        >
          <span className="truncate">{buttonText}</span>
        </a>
      </div>
    </div>
  );
};

export default DemoButton;
