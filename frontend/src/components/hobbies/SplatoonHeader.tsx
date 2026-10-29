import React from "react";
import BreadcrumbWithSchema from "@/components/BreadcrumbWithSchema";

type Props = {
  activePage: "records" | "gear";
};

const pages = [
  { id: "records", label: "XP記録", href: "/hobbies/splatoon/" },
  { id: "gear", label: "ギア", href: "/hobbies/splatoon/gear/" },
] as const;

const SplatoonHeader: React.FC<Props> = ({ activePage }) => (
  <>
    <BreadcrumbWithSchema
      pathname={
        activePage === "gear" ? "/hobbies/splatoon/gear/" : "/hobbies/splatoon/"
      }
    />
    <header className="mb-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-primary-100">
      <h1 className="text-2xl font-bold text-primary-900">Splatoon</h1>
      <nav aria-label="Splatoonのページ">
        <ul className="flex gap-1">
          {pages.map((page) => (
            <li key={page.id}>
              <a
                href={page.href}
                aria-current={activePage === page.id ? "page" : undefined}
                className={`block border-b-2 px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary-600 ${
                  activePage === page.id
                    ? "border-primary-700 font-bold text-primary-900"
                    : "border-transparent text-secondary-500 hover:border-primary-200 hover:text-primary-700"
                }`}
              >
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  </>
);

export default SplatoonHeader;
