import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#121416]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">
          ara-ta3のポートフォリオ
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-[#121416] text-sm font-medium leading-normal"
            href="#projects"
          >
            プロジェクト
          </a>
          <a
            className="text-[#121416] text-sm font-medium leading-normal"
            href="#skills"
          >
            スキル
          </a>
          <a
            className="text-[#121416] text-sm font-medium leading-normal"
            href="#articles"
          >
            アーティクル
          </a>
          <a
            className="text-[#121416] text-sm font-medium leading-normal"
            href="#contact"
          >
            お問い合わせ
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
