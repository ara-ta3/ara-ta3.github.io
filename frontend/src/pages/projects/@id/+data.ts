import { getProjectById } from "@/utils/projects";
import type { Project } from "@/types/project";

export type Data = {
  project: Project;
};

export default function data(pageContext: { routeParams: { id: string } }) {
  const { id } = pageContext.routeParams;
  const project = getProjectById(id);

  if (!project) {
    throw new Error(`Project with id "${id}" not found`);
  }

  return {
    project,
  };
}
