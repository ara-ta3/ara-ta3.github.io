import React from "react";
import type { ProjectSocialLink } from "@/types/project";

interface DemoButtonProps {
  demoUrl?: string;
  socialLinks?: ProjectSocialLink[];
}

const linkClassName =
  "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-700 text-white text-sm font-bold leading-normal hover:bg-primary-500 transition-colors";

const DemoButton: React.FC<DemoButtonProps> = ({
  demoUrl,
  socialLinks = [],
}) => {
  if (!demoUrl && socialLinks.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-primary-900 text-xl font-bold leading-tight px-4 py-4">
        Links
      </h2>
      <div className="flex flex-wrap gap-3 px-4 justify-start">
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span className="truncate">公開ページを見る</span>
          </a>
        )}
        {socialLinks.map((socialLink) => (
          <a
            key={socialLink.label}
            href={socialLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            <span className="truncate">{socialLink.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DemoButton;
