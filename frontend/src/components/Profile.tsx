import React from "react";
import StructuredData, { type PersonData } from "@/components/StructuredData";

const Profile: React.FC = () => {
  const personData: PersonData = {
    name: "ara-ta3",
    description:
      "Scala、TypeScript、Goなどの型付言語が好きなWebエンジニアです。",
    image: "https://github.com/ara-ta3.png",
    url: "https://ara-ta3.github.io",
    sameAs: ["https://x.com/ara_ta3", "https://github.com/ara-ta3"],
    jobTitle: "Webエンジニア",
    knowsAbout: ["Scala", "TypeScript", "Go", "React", "ZIO", "AWS", "Docker"],
  };
  return (
    <>
      <StructuredData person={personData} />
      <div className="flex p-4">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{
                backgroundImage: 'url("https://github.com/ara-ta3.png")',
              }}
            ></div>
            <div className="flex flex-col items-center justify-center justify-center">
              <h1 className="text-primary-700 text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                ara-ta3
              </h1>
              <p className="text-primary-900 font-normal leading-normal text-center">
                Scala、TypeScript、Goなどの型付言語が好きなWebエンジニアです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
