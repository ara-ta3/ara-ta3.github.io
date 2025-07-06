import React from "react";

interface WebPageData {
  title: string;
  description: string;
  url: string;
  type?: "WebSite" | "WebPage" | "Person" | "SoftwareApplication";
}

interface StructuredDataProps {
  data: WebPageData;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const baseUrl = "https://ara-ta3.github.io";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ara-ta3のポートフォリオ",
    alternateName: "ara-ta3.github.io",
    url: baseUrl,
    description: "portfolioのように見える遊び場です",
    author: {
      "@type": "Person",
      name: "ara-ta3",
      url: "https://x.com/ara_ta3",
      sameAs: ["https://x.com/ara_ta3", "https://github.com/ara-ta3"],
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": data.type || "WebPage",
    name: data.title,
    description: data.description,
    url: data.url,
    isPartOf: {
      "@type": "WebSite",
      name: "ara-ta3のポートフォリオ",
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  );
};

export default StructuredData;
