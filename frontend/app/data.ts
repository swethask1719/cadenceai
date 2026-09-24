import type { IconName } from "./components/Icon";

export type Course = {
  id: string;
  title: string;
  detail: string;
  progress: number;
  icon: IconName;
  badge: string;
};

export const activeCourses: Course[] = [
  {
    id: "backend-systems",
    title: "Backend Systems",
    detail: "Transactions and isolation levels · guided voice lesson",
    progress: 64,
    icon: "database",
    badge: "Next up",
  },
  {
    id: "japanese-foundations",
    title: "Japanese Foundations",
    detail: "Daily conversation · four phrases ready for recall",
    progress: 38,
    icon: "languages",
    badge: "Review due",
  },
  {
    id: "product-analytics",
    title: "Product Analytics",
    detail: "Build a retention analysis · practical milestone",
    progress: 79,
    icon: "chart",
    badge: "Project",
  },
];

export const publicCourses = [
  {
    title: "Distributed Systems from First Principles",
    detail: "8 modules · 14 sources · project based",
    creator: "Dr. Maya Shah",
    initials: "MS",
    followers: "12.4k",
    likes: "1.8k",
    dislikes: 42,
    icon: "blocks" as IconName,
  },
  {
    title: "Designing Reliable Event Systems",
    detail: "6 modules · 9 sources · intermediate",
    creator: "Jon Lee",
    initials: "JL",
    followers: "6.8k",
    likes: 932,
    dislikes: 18,
    icon: "network" as IconName,
  },
  {
    title: "Database Internals, Visually",
    detail: "10 modules · 22 sources · visual course",
    creator: "Amrita K",
    initials: "AK",
    followers: "3.1k",
    likes: 704,
    dislikes: 27,
    icon: "database" as IconName,
  },
];

export const creatorCourses = [
  {
    title: "Backend Systems",
    detail: "4 modules · 18 sources · updated today",
    badge: "Draft · private",
    icon: "database" as IconName,
  },
  {
    title: "Product Metrics Basics",
    detail: "312 learners · 94% positive · 4 suggestions",
    badge: "Published",
    icon: "chart" as IconName,
  },
];
