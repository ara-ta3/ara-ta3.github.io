export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  metaDescription?: string;
  overview: string;
  technologies: string[];
  details: ProjectDetail[];
  imageUrl?: string;
  demoUrl?: string;
}
