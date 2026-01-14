import React from "react";
import { FaBook, FaGithub, FaRss } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    name: "X (Twitter)",
    href: "https://x.com/ara_ta3",
    icon: <FaXTwitter />,
  },
  {
    name: "GitHub",
    href: "https://github.com/ara-ta3",
    icon: <FaGithub />,
  },
  {
    name: "Zenn",
    href: "https://zenn.dev/ara_ta3",
    icon: <FaBook />,
  },
  {
    name: "ブログ",
    href: "https://arata.hatenadiary.com/",
    icon: <FaBook />,
  },
];

const Profile: React.FC = () => {
  return (
    <div className="flex p-4">
      <div className="flex w-full flex-col gap-6 items-center">
        <div className="flex gap-4 flex-col items-center">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 ring-4 ring-secondary-100 shadow-md"
            style={{ backgroundImage: 'url("https://github.com/ara-ta3.png")' }}
          ></div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-primary-700 text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
              ara-ta3
            </h1>
            <p className="text-primary-900 font-normal leading-normal text-center max-w-[520px]">
              Scala、TypeScript、Goなどの型付言語が好きなWebエンジニアです。
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="group inline-flex items-center justify-center rounded-full border border-secondary-200 bg-white p-3 text-primary-700 shadow-sm transition hover:bg-primary-50 hover:text-primary-900"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100 text-primary-700 transition group-hover:bg-primary-100">
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
