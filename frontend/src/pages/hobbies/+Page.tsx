import React from "react";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";

const HobbiesPage: React.FC = () => {
  return (
    <>
      <BreadcrumbWithSchema pathname="/hobbies/" />
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary-900">趣味</h1>
        <p className="mt-2 text-primary-500">
          好きなことや、続けている遊びの記録をまとめています
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          className="group rounded-xl border border-primary-100 bg-white p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md"
          href="/hobbies/splatoon/"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Game
          </p>
          <h2 className="mt-2 text-2xl font-bold text-primary-900">Splatoon</h2>
          <p className="mt-3 leading-7 text-secondary-600">
            Splatoon 3のXマッチで遊んだ、シーズン別の最高XPと順位の記録です。
          </p>
          <p className="mt-4 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
            記録を見る →
          </p>
        </a>
      </div>
    </>
  );
};

export default HobbiesPage;
