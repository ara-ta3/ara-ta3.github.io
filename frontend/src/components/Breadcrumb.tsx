import React from "react";
import { Breadcrumb as FlowbiteBreadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { BreadcrumbItem } from "@/hooks/useBreadcrumbs";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <nav className="mb-4">
      <FlowbiteBreadcrumb>
        {items.map((item, index) => (
          <FlowbiteBreadcrumb.Item
            key={index}
            href={item.isLast ? undefined : item.url}
            className={item.isLast ? "text-gray-500" : ""}
            icon={index === 0 ? HiHome : undefined}
          >
            {item.name}
          </FlowbiteBreadcrumb.Item>
        ))}
      </FlowbiteBreadcrumb>
    </nav>
  );
};

export default Breadcrumb;
