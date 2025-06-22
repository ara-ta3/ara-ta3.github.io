import React from "react";
import { FaBook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HeadingTitle } from "./Heading";

const Contact: React.FC = () => {
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
  ];

  return (
    <div id="contact" className="py-4">
      <HeadingTitle title="アカウント" />
      <div className="@container">
        <div className="gap-2 px-4 flex flex-wrap justify-start">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target="_blank">
              <div className="flex flex-col items-center gap-2 py-2 text-center w-24 ">
                <div className="rounded-full bg-secondary-100 p-4">
                  <div
                    className="text-primary-1000"
                    data-icon="SocialIcon"
                    data-size="24px"
                    data-weight="regular"
                  >
                    {link.icon}
                  </div>
                </div>
                <p className="text-primary-700 text-sm font-medium">
                  {link.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
