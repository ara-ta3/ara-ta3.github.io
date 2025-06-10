import React from "react";
import { Breadcrumb as FlowbiteBreadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

interface BreadcrumbItem {
  name: string;
  url: string;
  isLast?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <nav className="mb-4">
      <FlowbiteBreadcrumb>
        <FlowbiteBreadcrumb.Item href="/" icon={HiHome}>
          ホーム
        </FlowbiteBreadcrumb.Item>
        {items.map((item, index) => (
          <FlowbiteBreadcrumb.Item
            key={index}
            href={item.isLast ? undefined : item.url}
            className={item.isLast ? "text-gray-500" : ""}
          >
            {item.name}
          </FlowbiteBreadcrumb.Item>
        ))}
      </FlowbiteBreadcrumb>
    </nav>
  );
};

export default Breadcrumb;
