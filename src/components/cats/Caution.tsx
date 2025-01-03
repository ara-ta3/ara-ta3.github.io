import React from "react";

const Caution: React.FC = () => {
  return (
    <>
      <h2 className="text-1xl font-extrabold dark:text-white">注意事項</h2>
      <p className="my-4 text-sm text-gray-500">
        本サイトの計算結果は参考情報であり、猫の健康状態や栄養管理を保証するものではありません。
      </p>
      <p className="my-4 text-sm text-gray-500">
        判断は飼い主様の責任でお願いいたします。必ずかかりつけの獣医師に相談の上でご利用ください。
      </p>
      <p className="my-4 text-sm text-gray-500">
        もし機能改善などのご要望がある場合は
        <a
          className="hover:underline text-blue-600"
          href="https://forms.gle/Ub7AofzTy4WJeVZPA"
          target="_blank"
        >
          こちら
        </a>
        へ
      </p>
    </>
  );
};

export default Caution;
