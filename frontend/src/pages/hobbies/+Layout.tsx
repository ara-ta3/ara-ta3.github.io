import React from "react";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};

const HobbiesLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="flex grow justify-center px-4 py-4 sm:px-8">
        <div className="flex w-full max-w-[1120px] flex-col">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default HobbiesLayout;
