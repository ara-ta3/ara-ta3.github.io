export interface BreadcrumbConfig {
  name: string;
  parent?: string;
}

export const breadcrumbConfig: Record<string, BreadcrumbConfig> = {
  "/": {
    name: "ホーム",
  },
  "/projects/": {
    name: "プロジェクト",
    parent: "/",
  },
  "/articles/": {
    name: "記事一覧",
    parent: "/",
  },
  "/electricity/": {
    name: "電気代比較ツール",
    parent: "/",
  },
  "/schedules/": {
    name: "スケジュール管理",
    parent: "/",
  },
};

export const getDynamicBreadcrumbConfig = (
  pathname: string,
): BreadcrumbConfig | null => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return breadcrumbConfig["/"];

  const exactMatch = breadcrumbConfig[pathname];
  if (exactMatch) return exactMatch;

  // プロジェクト詳細ページ（/projects/id）の場合
  if (segments.length === 2 && segments[0] === "projects") {
    const projectId = segments[1];

    // プロジェクト名を動的に取得
    const getProjectName = (id: string): string => {
      const projects = [
        {
          id: "personal-website",
          title: "個人ウェブサイト(ara-ta3.github.io)",
        },
        { id: "nekometry", title: "Nekometry" },
      ];
      const project = projects.find((p) => p.id === id);
      return project ? project.title : "プロジェクト詳細";
    };

    return {
      name: getProjectName(projectId),
      parent: "/projects/",
    };
  }

  return null;
};
