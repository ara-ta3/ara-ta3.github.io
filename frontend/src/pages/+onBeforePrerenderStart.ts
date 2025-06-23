import { getAllProjectIds } from "@/utils/projects";

export default function onBeforePrerenderStart() {
  const projectIds = getAllProjectIds();
  const projectUrls = projectIds.map((id) => `/projects/${id}`);

  // 重複を排除
  return [...new Set(projectUrls)];
}
