import React from "react";

interface PersonData {
  name: string;
  description: string;
  image: string;
  url: string;
  sameAs: string[];
  jobTitle: string;
  knowsAbout: string[];
}

interface ProjectData {
  name: string;
  description: string;
  image?: string;
  url?: string;
  author: string;
  programmingLanguage?: string[];
  applicationCategory?: string;
}

interface SkillData {
  name: string;
  description: string;
  category?: string;
}

interface WebPageData {
  title: string;
  description: string;
  url: string;
  type?: "WebSite" | "WebPage" | "Person" | "SoftwareApplication";
}

interface OfferData {
  price: string;
  priceCurrency: string;
}

interface SoftwareApplicationData {
  name: string;
  description: string;
  image?: string;
  url: string; // canonical page or app URL
  applicationCategory?: string; // defaults to WebApplication
  operatingSystem?: string; // defaults to Web
  authorName?: string;
  offers?: OfferData; // e.g. { price: "0", priceCurrency: "JPY" }
}

interface StructuredDataProps {
  data?: WebPageData;
  person?: PersonData;
  projects?: ProjectData[];
  skills?: SkillData[];
  includeWebsite?: boolean;
  softwareApp?: SoftwareApplicationData;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  data,
  person,
  projects,
  skills,
  includeWebsite = false,
  softwareApp,
}) => {
  const baseUrl = "https://ara-ta3.github.io";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
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

  const personSchema = person
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: person.name,
        description: person.description,
        image: person.image,
        url: person.url,
        sameAs: person.sameAs,
        jobTitle: person.jobTitle,
        knowsAbout: person.knowsAbout,
      }
    : null;

  const toAbsoluteUrl = (value?: string) =>
    value ? (value.startsWith("http") ? value : `${baseUrl}${value}`) : undefined;

  const projectsSchema =
    projects && projects.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "プロジェクト",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              name: project.name,
              description: project.description,
              image: toAbsoluteUrl(project.image),
              url: toAbsoluteUrl(project.url),
              author: {
                "@type": "Person",
                name: project.author,
              },
              programmingLanguage: project.programmingLanguage,
              applicationCategory:
                project.applicationCategory || "WebApplication",
            },
          })),
        }
      : null;

  const skillsSchema =
    skills && skills.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "スキル",
          numberOfItems: skills.length,
          itemListElement: skills.map((skill, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "DefinedTerm",
              name: skill.name,
              description: skill.description,
              inDefinedTermSet: skill.category || "Programming Skills",
            },
          })),
        }
      : null;

  const webPageSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": data.type || "WebPage",
        "@id": `${data.url}#webpage`,
        name: data.title,
        description: data.description,
        url: data.url,
        isPartOf: {
          "@type": "WebSite",
          name: "ara-ta3のポートフォリオ",
          url: baseUrl,
        },
        ...(softwareApp
          ? {
              mainEntity: {
                "@id": `${toAbsoluteUrl(softwareApp.url)}#software`,
              },
            }
          : {}),
      }
    : null;

  const softwareAppSchema = softwareApp
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${toAbsoluteUrl(softwareApp.url)}#software`,
        name: softwareApp.name,
        description: softwareApp.description,
        url: toAbsoluteUrl(softwareApp.url),
        image: toAbsoluteUrl(softwareApp.image),
        applicationCategory: softwareApp.applicationCategory || "WebApplication",
        operatingSystem: softwareApp.operatingSystem || "Web",
        ...(softwareApp.authorName
          ? { author: { "@type": "Person", name: softwareApp.authorName } }
          : {}),
        ...(data?.url
          ? { mainEntityOfPage: { "@id": `${data.url}#webpage` } }
          : {}),
        ...(softwareApp.offers
          ? {
              offers: {
                "@type": "Offer",
                price: softwareApp.offers.price,
                priceCurrency: softwareApp.offers.priceCurrency,
              },
            }
          : {}),
      }
    : null;

  return (
    <>
      {includeWebsite && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      )}
      {webPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema),
          }}
        />
      )}
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      )}
      {projectsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectsSchema),
          }}
        />
      )}
      {skillsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(skillsSchema),
          }}
        />
      )}
      {softwareAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
      )}
    </>
  );
};

export type { PersonData, ProjectData, SkillData };
export default StructuredData;
