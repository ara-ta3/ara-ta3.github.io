import type { Project } from "@/types/project";
import Nekometry from "@/assets/images/nekometry.jpg";

export const projects: Project[] = [
  {
    id: "personal-website",
    title: "個人ウェブサイト(ara-ta3.github.io)",
    description: "Vite+Vikeを使用したSSGによる個人ポートフォリオサイト",
    overview:
      "このサイトは個人のポートフォリオを紹介する気持ちを持ちながら、フロントエンドの技術をお試しするページです。",
    technologies: [
      "Vite",
      "Vike",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Flowbite",
      "GitHub Pages",
    ],
    details: [
      { label: "Project Type", value: "個人ポートフォリオサイト" },
      { label: "Hosting", value: "GitHub Pages" },
      { label: "CI/CD", value: "GitHub Actions" },
    ],
    demoUrl: "https://ara-ta3.github.io",
    buttonText: "サイトを見る",
  },
  {
    id: "nekometry",
    title: "Nekometry",
    description: "ペットの健康管理を支援するWebアプリケーション",

    overview:
      "猫の健康管理をサポートするカロリー計算ツールです。猫の体重、年齢、活動レベルに基づいて適切な一日の摂取カロリーを計算し、飼い主がペットの健康状態を把握できるよう支援します。",
    technologies: [
      "Vite",
      "Vike",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Flowbite",
      "Firebase",
      "FireStore",
    ],
    details: [
      { label: "Project Type", value: "健康管理ツール" },
      { label: "Hosting", value: "Firebase Hosting" },
      { label: "CI/CD", value: "GitHub Actions" },
      { label: "対象ユーザ", value: "猫の飼い主" },
    ],
    imageUrl: Nekometry as string,
    demoUrl: "https://nekometry.web.app/",
    buttonText: "ツールを使う",
  },
];
