import type { Project } from "@/types/project";
import { projects } from "@/data/projects";

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find((project) => project.id === id);
}

export function getAllProjectIds(): string[] {
  return getAllProjects().map((project) => project.id);
}
