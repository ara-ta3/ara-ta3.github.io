import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex p-4 @container">
      <div className="flex w-full flex-col gap-4 items-center">
        <div className="flex gap-4 flex-col items-center">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
            style={{ backgroundImage: 'url("https://github.com/ara-ta3.png")' }}
          ></div>
          <div className="flex flex-col items-center justify-center justify-center">
            <p className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
              ara-ta3
            </p>
            <p className="text-[#6a7581] text-base font-normal leading-normal text-center">
              ソフトウェアエンジニア
            </p>
            <p className="text-[#6a7581] text-base font-normal leading-normal text-center">
              スケーラブルでユーザーフレンドリーなアプリケーションの構築に情熱を持つソフトウェアエンジニアです。React、Scala、ZIOなど様々な技術を使って開発しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
