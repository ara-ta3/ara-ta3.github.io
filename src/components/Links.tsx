import React from "react";
import { Card } from "flowbite-react";

const Tools: React.FC = () => {
  const links = [
    {
      name: "X(Twitter)",
      href: "https://x.com/ara_ta3",
    },
    {
      name: "GitHub",
      href: "https://github.com/ara-ta3",
    },
    {
      name: "zenn.dev",
      href: "https://zenn.dev/ara_ta3",
    },
    {
      name: "はてなブログ",
      href: "https://arata.hatenadiary.com/",
    },
  ];
  return (
    <section id="links" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Links</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <a key={link.name} href={link.href} target="_blank">
              <Card className="w-full">
                <h5 className="text-base md:text-lg text-center font-bold text-gray-900">
                  {link.name}
                </h5>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
