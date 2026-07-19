import React from "react";
import Logo from "@/assets/images/logo.png";

const HeaderMenuItem: React.FC<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  return (
    <a
      className="whitespace-nowrap text-xs font-medium leading-normal text-primary-500 hover:text-primary-700 sm:text-sm"
      href={href}
    >
      {children}
    </a>
  );
};

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-gray-200 bg-white px-4 py-4 sm:px-8">
      <div className="flex items-center gap-4 ">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 transition-opacity hover:opacity-80 sm:w-24"
          />
        </a>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-4 sm:gap-9">
          <HeaderMenuItem href="/projects">個人開発</HeaderMenuItem>
          <HeaderMenuItem href="/articles">記事一覧</HeaderMenuItem>
          <HeaderMenuItem href="/slides">スライド</HeaderMenuItem>
          <HeaderMenuItem href="/hobbies">趣味</HeaderMenuItem>
        </div>
      </div>
    </header>
  );
};

export default Header;
