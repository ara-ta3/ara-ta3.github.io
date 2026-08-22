import React from "react";
import { JsonLd } from "react-schemaorg";
import type { WebPage, WebSite, WithContext } from "schema-dts";

interface WebPageData {
  title: string;
  description: string;
  url: string;
  type?: "WebSite" | "WebPage";
}

interface StructuredDataProps {
  data: WebPageData;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  if (data.type === "WebSite") {
    const websiteSchema: WithContext<WebSite> = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: data.title,
      description: data.description,
      url: data.url,
      alternateName: "ara-ta3.github.io",
      author: {
        "@type": "Person",
        name: "ara-ta3",
        url: "https://x.com/ara_ta3",
        sameAs: ["https://x.com/ara_ta3", "https://github.com/ara-ta3"],
      },
    };

    return <JsonLd<WebSite> item={websiteSchema} />;
  }

  const webPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.description,
    url: data.url,
    isPartOf: {
      "@type": "WebSite",
      name: "ara-ta3の個人サイト",
      url: "https://ara-ta3.github.io",
    },
  };

  return <JsonLd<WebPage> item={webPageSchema} />;
};

export default StructuredData;
