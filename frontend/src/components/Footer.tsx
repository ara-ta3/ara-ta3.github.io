import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <p className="text-[#6a7581] text-base font-normal leading-normal">
            © 2024 ara-ta3. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
