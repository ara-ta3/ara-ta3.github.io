export interface BreadcrumbConfig {
  name: string;
  parent?: string;
}

export const breadcrumbConfig: Record<string, BreadcrumbConfig> = {
  "/": {
    name: "ホーム",
  },
};

export const getDynamicBreadcrumbConfig = (
  pathname: string,
): BreadcrumbConfig | null => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return breadcrumbConfig["/"];

  const exactMatch = breadcrumbConfig[pathname];
  if (exactMatch) return exactMatch;

  return null;
};
