import React from "react";
import Logo from "@/assets/images/logo.png";

const HeaderMenuItem: React.FC<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  return (
    <a
      className="text-primary-500 hover:text-primary-700 text-sm font-medium leading-normal"
      href={href}
    >
      {children}
    </a>
  );
};

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-solid border-b px-8 py-4 sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-4 ">
        <div>
          <img src={Logo} alt="Logo" className="w-24" />
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <HeaderMenuItem href="#project">プロジェクト</HeaderMenuItem>
          <HeaderMenuItem href="#articles">記事</HeaderMenuItem>
          <HeaderMenuItem href="#contact">SNSアカウント</HeaderMenuItem>
        </div>
      </div>
    </header>
  );
};

export default Header;
