import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <a href="/">ara-ta3の物置</a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#tools" className="hover:text-blue-500">Tools</a>
            </li>
            <li>
              <a
                href="https://github.com/ara-ta3/ara-ta3.github.io"
                className="hover:text-blue-500"
                target="_blank"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
