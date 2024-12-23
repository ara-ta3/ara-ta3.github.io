import React from "react";

const Caution: React.FC = () => {
  return (
    <>
      <h2 className="text-1xl font-extrabold dark:text-white">
        注意事項
      </h2>
      <p className="my-4 text-sm text-gray-500">
        本サイトの計算結果は参考情報であり、猫の健康状態や栄養管理を保証するものではありません。
      </p>
      <p className="my-4 text-sm text-gray-500">
        判断は飼い主様の責任でお願いいたします。必ずかかりつけの獣医師に相談の上でご利用ください。
      </p>
    </>
  );
};

export default Caution;
