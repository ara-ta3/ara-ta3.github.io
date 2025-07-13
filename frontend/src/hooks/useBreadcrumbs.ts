import { useMemo } from "react";
import { getDynamicBreadcrumbConfig } from "@/utils/breadcrumbConfig";

export interface BreadcrumbItem {
  name: string;
  url: string;
  isLast?: boolean;
}

export const useBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  return useMemo(() => {
    const buildBreadcrumbs = (path: string): BreadcrumbItem[] => {
      const config = getDynamicBreadcrumbConfig(path);
      if (!config) return [];

      const items: BreadcrumbItem[] = [];

      if (config.parent) {
        items.push(...buildBreadcrumbs(config.parent));
      }

      items.push({
        name: config.name,
        url: path,
        isLast: true,
      });

      return items;
    };

    const items = buildBreadcrumbs(pathname);

    if (items.length > 0) {
      items[items.length - 1].isLast = true;
      items.slice(0, -1).forEach((item) => {
        item.isLast = false;
      });
    }

    return items;
  }, [pathname]);
};
