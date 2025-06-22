import React from "react";

const Skills: React.FC = () => {
  const skills = [
    {
      name: "React",
      description:
        "ユーザーインターフェイスを構築するためのJavaScriptライブラリ。",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M223.68,66.15,135.68,18a15.94,15.94,0,0,0-15.36,0l-88,48.18a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM168,152v50.09l-32,17.52V132.74l80-43.8v32l-43.84,24A8,8,0,0,0,168,152Zm-84.16-7L40,121v-32l80,43.8v86.87L88,202.09V152A8,8,0,0,0,83.84,145Zm-.7-88.41,41,22.45a8,8,0,0,0,7.68,0l41-22.45,34.48,18.87L128,118.88,48.66,75.44ZM128,32h0l28.2,15.44L128,62.89,99.8,47.45ZM40,139.22l32,17.52v36.59L40,175.82Zm144,54.11V156.74l32-17.52v36.6Z"></path>
        </svg>
      ),
    },
    {
      name: "TypeScript",
      description: "型安全性を提供するJavaScriptのスーパーセット。",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29L15.38,141.85a8,8,0,0,1,0-12.29L58.88,97.85a8,8,0,0,1,10.24,12.3Zm176,27.7-43.5-31.85a8,8,0,1,0-9.24,13.12L232,128l-39.64,24.88a8,8,0,0,0,9.24,13.12l43.5-31.85a8,8,0,0,0,0-13.3ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
        </svg>
      ),
    },
    {
      name: "Scala",
      description: "関数型プログラミングとオブジェクト指向を融合した言語。",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,32H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,112H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,32H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,32H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
        </svg>
      ),
    },
    {
      name: "ZIO",
      description: "Scala用の非同期・並行プログラミングライブラリ。",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15.25,67.23,24.64,80,24.64s62.94-9.39,80-24.64ZM208,80c0,22.09-35.82,40-80,40S48,102.09,48,80s35.82-40,80-40S208,57.91,208,80ZM208,176c0,9.62-7.88,19.43-21.61,26.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15.25,67.23,24.64,80,24.64s62.94-9.39,80-24.64Z"></path>
        </svg>
      ),
    },
    {
      name: "AWS",
      description: "クラウドコンピューティングサービスとインフラストラクチャ。",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,0,0,72,216h88a88,88,0,0,0,0-176ZM160,200H72a48,48,0,0,1,0-96,8,8,0,0,0,8-8,72,72,0,0,1,144,0,72.08,72.08,0,0,1-64,71.6Z"></path>
        </svg>
      ),
    },
    {
      name: "Docker",
      description: "アプリケーションをコンテナ化するためのプラットフォーム。",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M236.55,149.42,194.05,120l42.5-29.42a8,8,0,0,0,0-13.16l-52-36a8,8,0,0,0-9.1,0L128,74.27,80.55,41.42a8,8,0,0,0-9.1,0l-52,36a8,8,0,0,0,0,13.16L62,120l-42.5,29.42a8,8,0,0,0,0,13.16l52,36a8,8,0,0,0,9.1,0L128,165.73l47.45,32.85a8,8,0,0,0,9.1,0l52-36a8,8,0,0,0,0-13.16ZM128,146.27,90.05,120l38-26.27L166,120Zm52-88.54L218,84,180,110.27,142.05,84Zm-104,0L114,84,76,110.27,38.05,84Zm0,124.54L38.05,156l38-26.27L114,156Zm104,0L142.05,156,180,129.73,218,156Zm-21.53,24.64a8,8,0,0,1-2,11.13l-23.89,16.54a8,8,0,0,1-9.1,0L99.56,218a8,8,0,0,1,9.1-13.16L128,218.27l19.34-13.39A8,8,0,0,1,158.47,206.91Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div id="skills">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        スキル
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-1 gap-3 rounded-lg border border-[#dde0e3] bg-white p-4 flex-col"
          >
            <div
              className="text-[#121416]"
              data-icon="SkillIcon"
              data-size="24px"
              data-weight="regular"
            >
              {skill.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#121416] text-base font-bold leading-tight">
                {skill.name}
              </h2>
              <p className="text-[#6a7581] text-sm font-normal leading-normal">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
