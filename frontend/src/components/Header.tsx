import React from "react";
import Logo from "@/assets/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#121416]">
        <div className="size-4">
          <img src={Logo} alt="Logo" />
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
            href="#articles"
          >
            記事
          </a>
          <a
            className="text-[#121416] text-sm font-medium leading-normal"
            href="#contact"
          >
            SNSアカウント
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
