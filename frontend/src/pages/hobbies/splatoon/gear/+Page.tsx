import React, { useEffect, useState } from "react";
import SplatoonHeader from "@/components/hobbies/SplatoonHeader";
import {
  splatoonGearMemos,
  splatoonGearPowerGroups,
} from "@/data/splatoonGear";

const SplatoonGearPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAllPowers, setShowAllPowers] = useState(false);
  const memo = splatoonGearMemos[selectedIndex];
  const visiblePowerGroups = splatoonGearPowerGroups
    .map((group) => ({
      ...group,
      powers: group.powers.filter(
        (name) =>
          showAllPowers ||
          memo.powers.some(
            ([powerName, main, sub]) =>
              powerName === name && (main > 0 || sub > 0),
          ),
      ),
    }))
    .filter((group) => group.powers.length > 0);

  useEffect(() => {
    const syncSelectionFromHash = () => {
      const index = splatoonGearMemos.findIndex(
        (gearMemo) => `#${gearMemo.id}` === window.location.hash,
      );
      setSelectedIndex(index === -1 ? 0 : index);
    };

    syncSelectionFromHash();
    window.addEventListener("hashchange", syncSelectionFromHash);
    return () =>
      window.removeEventListener("hashchange", syncSelectionFromHash);
  }, []);

  return (
    <>
      <SplatoonHeader activePage="gear" />

      <details className="mb-3 rounded-lg bg-primary-50 px-3 py-2 text-xs leading-6 text-primary-900">
        <summary className="cursor-pointer">
          数字の見方：メイン.サブ（例：1.2＝メイン1個・サブ2個）
        </summary>
        <p>
          数字は「メインの個数.サブの個数」で表記しています。たとえば「復活時間短縮
          1.2」は、メイン1個・サブ2個です。
          画像下部の効果量（+1.6など）とは異なります。
        </p>
        <p>
          カムバックなどの専用ギアパワーも、メイン1個を「1.0」と表記します。
        </p>
        <p>
          初期表示は0以外のギアパワーのみです。「すべて」に切り替えると全26種類を表示し、付けていないものは「0.0」と表記します。
        </p>
        <p>
          記録日：<time dateTime="2026-10-29">2026年10月29日</time>
        </p>
      </details>

      <nav aria-label="ギア構成の切り替え" className="mb-4">
        <ul className="flex flex-wrap gap-2">
          {splatoonGearMemos.map((memo, index) => (
            <li key={memo.id}>
              <button
                type="button"
                aria-pressed={index === selectedIndex}
                aria-controls="gear-memo"
                onClick={() => {
                  setSelectedIndex(index);
                  window.location.hash = memo.id;
                }}
                className={`inline-block cursor-pointer rounded-full border px-4 py-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
                  index === selectedIndex
                    ? "border-primary-700 bg-primary-700 text-white"
                    : "border-primary-200 text-primary-700 hover:bg-primary-50"
                }`}
              >
                {String(index + 1).padStart(2, "0")} {memo.weapon}
                {index < 2 && `（${memo.variant}）`}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <article
        key={memo.id}
        id="gear-memo"
        aria-labelledby={`${memo.id}-title`}
        className="scroll-mt-24 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
      >
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-primary-100 px-4 py-3">
          <p className="text-xs font-semibold text-primary-500">
            {String(selectedIndex + 1).padStart(2, "0")} / {memo.variant}
          </p>
          <h2
            id={`${memo.id}-title`}
            className="text-lg font-bold text-primary-900"
          >
            {memo.weapon}
          </h2>
        </header>
        <div className="grid items-start gap-4 p-4 lg:grid-cols-[2fr_3fr]">
          <figure className="lg:self-center">
            <a
              href={memo.image}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus-visible:outline-2 focus-visible:outline-primary-600"
            >
              <img
                src={memo.image}
                alt={`${memo.weapon}（${memo.variant}）のマイコーデ。画像を別タブで拡大`}
                width={1200}
                height={675}
                loading="lazy"
                className="h-auto w-full"
              />
            </a>
            <figcaption className="mt-2 text-xs text-secondary-600">
              画像を押すと別タブで拡大できます。
            </figcaption>
          </figure>
          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-primary-900">
                ギアパワー合計{" "}
                <span className="font-normal text-secondary-600">
                  （メイン.サブ）
                </span>
              </h3>
              <div
                role="group"
                aria-label="ギアパワーの表示"
                className="flex rounded border border-primary-200 text-xs"
              >
                <button
                  type="button"
                  aria-pressed={!showAllPowers}
                  onClick={() => setShowAllPowers(false)}
                  className={`cursor-pointer px-2 py-1 ${!showAllPowers ? "bg-primary-700 text-white" : "text-primary-700 hover:bg-primary-50"}`}
                >
                  0以外
                </button>
                <button
                  type="button"
                  aria-pressed={showAllPowers}
                  onClick={() => setShowAllPowers(true)}
                  className={`cursor-pointer px-2 py-1 ${showAllPowers ? "bg-primary-700 text-white" : "text-primary-700 hover:bg-primary-50"}`}
                >
                  すべて
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {visiblePowerGroups.map((group) => (
                <section
                  key={group.id}
                  aria-labelledby={`gear-group-${group.id}`}
                  className={group.id === "common" ? "sm:col-span-3" : ""}
                >
                  <h4
                    id={`gear-group-${group.id}`}
                    className="mb-1 rounded bg-primary-50 px-2 py-1 text-xs font-bold text-primary-800"
                  >
                    {group.label}
                    <span className="ml-1 font-normal text-secondary-500">
                      {group.id === "common" ? "全ての部位" : "メインのみ"}
                    </span>
                  </h4>
                  <dl
                    className={
                      group.id === "common" ? "grid gap-x-5 sm:grid-cols-2" : ""
                    }
                  >
                    {group.powers.map((name) => {
                      const power = memo.powers.find(
                        ([powerName]) => powerName === name,
                      );
                      const main = power?.[1] ?? 0;
                      const sub = power?.[2] ?? 0;
                      const isUnused = main === 0 && sub === 0;

                      return (
                        <div
                          key={name}
                          className={`flex items-baseline justify-between gap-2 border-b border-primary-100 py-1.5 lg:py-0 ${isUnused ? "text-gray-400" : "text-primary-900"}`}
                        >
                          <dt className="text-xs">{name}</dt>
                          <dd className="shrink-0 text-sm font-bold tabular-nums">
                            {main}.{sub}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>
      <a
        href="/hobbies/splatoon/"
        className="my-4 self-start text-sm text-primary-700 underline underline-offset-4 hover:text-primary-900"
      >
        Splatoonの記録に戻る
      </a>
    </>
  );
};

export default SplatoonGearPage;
