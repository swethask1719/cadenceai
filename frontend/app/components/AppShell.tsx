"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type NavItem = { href: string; label: string; icon: IconName };

const learnNav: NavItem[] = [
  { href: "/learn", label: "Home", icon: "home" },
  { href: "/learn/discover", label: "Discover", icon: "search" },
  { href: "/learn/following", label: "Following", icon: "users" },
  { href: "/learn/progress", label: "Progress", icon: "progress" },
];

const createNav: NavItem[] = [
  { href: "/create", label: "Creator home", icon: "dashboard" },
  { href: "/create/course", label: "Courses", icon: "courses" },
  { href: "/create", label: "Source library", icon: "library" },
];

function navIsActive(pathname: string, href: string) {
  if (href === "/learn" || href === "/create") return pathname === href;
  return pathname.startsWith(href);
}

export function AppShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = usePathname();
  const createMode = pathname.startsWith("/create");
  const navItems = createMode ? createNav : learnNav;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="app-brand" href="/learn">
          <span className="brand-mark">C</span>
          <span>Cadence</span>
        </Link>

        <div className="mode-switch" aria-label="Workspace mode">
          <Link className={!createMode ? "active" : ""} href="/learn">Learn</Link>
          <Link className={createMode ? "active" : ""} href="/create">Create</Link>
        </div>

        <nav className="side-nav" aria-label={createMode ? "Creator navigation" : "Learning navigation"}>
          <span className="nav-label">{createMode ? "Create" : "Learn"}</span>
          {navItems.map((item, index) => (
            <Link
              className={navIsActive(pathname, item.href) && !(index > 0 && item.href === "/create") ? "active" : ""}
              href={item.href}
              key={`${item.label}-${index}`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <Link className={`profile-link ${pathname === "/profile" ? "active" : ""}`} href="/profile">
          <span className="avatar">NM</span>
          <span className="profile-copy">
            <strong>Nisarg</strong>
            <small>Learner + creator</small>
          </span>
          <Icon name="settings" />
        </Link>
      </aside>

      <div className="app-workspace">
        <header className="topbar">
          <div className="topbar-title">{title}</div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Notifications">
              <Icon name="bell" />
            </button>
          </div>
        </header>
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
