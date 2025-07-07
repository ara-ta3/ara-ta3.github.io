import { create } from "zustand";
import { BreadcrumbItem } from "@/hooks/useBreadcrumbs";

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
