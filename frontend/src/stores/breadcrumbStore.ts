import { create } from "zustand";

export interface BreadcrumbItem {
  name: string;
  url: string;
  isLast: boolean;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
  clearBreadcrumbItems: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  items: [],
  setBreadcrumbItems: (items) => set({ items }),
  clearBreadcrumbItems: () => set({ items: [] }),
}));
