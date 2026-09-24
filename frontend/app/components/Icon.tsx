import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "search"
  | "users"
  | "progress"
  | "dashboard"
  | "courses"
  | "library"
  | "settings"
  | "bell"
  | "database"
  | "languages"
  | "chart"
  | "arrow-right"
  | "code"
  | "git"
  | "mic"
  | "message"
  | "file"
  | "image"
  | "checklist"
  | "link"
  | "upload"
  | "notes"
  | "globe"
  | "plus"
  | "sparkles"
  | "eye"
  | "thumbs-up"
  | "thumbs-down"
  | "refresh"
  | "blocks"
  | "network"
  | "brain"
  | "lock"
  | "key"
  | "audio"
  | "chevron-right"
  | "book-open"
  | "menu";

const paths: Record<IconName, React.ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  progress: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="m8 7 3 9m5-9-3 9M8 6h8"/></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  courses: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22Z"/></>,
  library: <><path d="M4 19.5V5a2 2 0 0 1 2-2h12v17H6.5A2.5 2.5 0 0 0 4 22.5Z"/><path d="M8 7h6m-6 4h6"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1v.1h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4h-.1v-4H3A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1v-.1h4V3A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.36.38.7.6 1 .24.3.6.37 1 .4h.1v4H21a1.7 1.7 0 0 0-1.6.6Z"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></>,
  languages: <><path d="M4 5h7m-3.5 0v2m-3 7 6-7m-4 3 4 4"/><path d="m14 19 3.5-9 3.5 9m-5.7-3h4.4"/></>,
  chart: <><path d="M4 19V9m6 10V5m6 14v-7m5 7H2"/></>,
  "arrow-right": <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
  code: <><path d="m8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12"/></>,
  git: <><circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 7v10m2-9c7 0 2 4 8 4"/></>,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8"/></>,
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>,
  file: <><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 13h6m-6 4h6"/></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/></>,
  checklist: <><path d="m4 6 2 2 3-4m3 3h8M4 14l2 2 3-4m3 3h8"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></>,
  upload: <><path d="M12 16V4m-5 5 5-5 5 5"/><path d="M5 20h14"/></>,
  notes: <><path d="M4 3h12l4 4v14H4Z"/><path d="M16 3v5h5M8 13h8m-8 4h5"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8Z"/></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12"/><circle cx="12" cy="12" r="3"/></>,
  "thumbs-up": <><path d="M7 10v11H3V10Zm0 9h10a3 3 0 0 0 3-2.5l1-6A3 3 0 0 0 18 7h-5l1-4-2-1-5 8"/></>,
  "thumbs-down": <><path d="M7 14V3H3v11Zm0-9h10a3 3 0 0 1 3 2.5l1 6A3 3 0 0 1 18 17h-5l1 4-2 1-5-8"/></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M18.5 9A7 7 0 0 0 6 6.5L4 9m2 6a7 7 0 0 0 12.5 2.5L20 15"/></>,
  blocks: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/></>,
  network: <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="m11 7-5 9m7-9 5 9M7 18h10"/></>,
  brain: <><path d="M9.5 4A3.5 3.5 0 0 0 6 7.5a3 3 0 0 0-1 5.8A3.5 3.5 0 0 0 9.5 19V4Zm5 0A3.5 3.5 0 0 1 18 7.5a3 3 0 0 1 1 5.8 3.5 3.5 0 0 1-4.5 5.7V4ZM9.5 9H7m7.5 3H17M9.5 15H7"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9m-3 3 3 3m-6 0 3 3"/></>,
  audio: <><path d="M4 10v4m4-7v10m4-14v18m4-14v10m4-7v4"/></>,
  "chevron-right": <path d="m9 18 6-6-6-6"/>,
  "book-open": <><path d="M3 5a3 3 0 0 1 3-3h5v18H6a3 3 0 0 0-3 3Zm18 0a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3Z"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
