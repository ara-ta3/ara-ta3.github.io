import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center py-12 bg-primary-50">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 text-center @container">
          <p className="text-primary-900 text-base font-normal leading-normal">
            © 2025 ara-ta3. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
