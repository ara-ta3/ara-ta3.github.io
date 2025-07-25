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

interface StructuredDataProps {
  data?: WebPageData;
  person?: PersonData;
  projects?: ProjectData[];
  skills?: SkillData[];
}

const StructuredData: React.FC<StructuredDataProps> = ({
  data,
  person,
  projects,
  skills,
}) => {
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

  const personSchema = person
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: person.name,
        description: person.description,
        image: person.image,
        url: person.url,
        sameAs: person.sameAs,
        jobTitle: person.jobTitle,
        knowsAbout: person.knowsAbout,
      }
    : null;

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
              image: project.image,
              url: project.url,
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
        name: data.title,
        description: data.description,
        url: data.url,
        isPartOf: {
          "@type": "WebSite",
          name: "ara-ta3のポートフォリオ",
          url: baseUrl,
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
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
    </>
  );
};

export type { PersonData, ProjectData, SkillData };
export default StructuredData;
