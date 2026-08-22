import React from "react";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { BreadcrumbItem } from "@/hooks/useBreadcrumbs";

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  if (items.length === 0) return null;

  const baseUrl = "https://ara-ta3.github.io";

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return <JsonLd<BreadcrumbList> item={breadcrumbSchema} />;
};

export default BreadcrumbSchema;
