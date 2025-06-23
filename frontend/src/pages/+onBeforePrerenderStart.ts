import { getAllProjectIds } from "@/utils/projects";

export default function onBeforePrerenderStart() {
  const projectIds = getAllProjectIds();
  const projectUrls = projectIds.map((id) => `/projects/${id}`);

  return ["/", "/projects", "/schedules", "/electricity", ...projectUrls];
}
