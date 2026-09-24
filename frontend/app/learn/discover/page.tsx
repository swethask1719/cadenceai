"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell";
import { Icon } from "../../components/Icon";
import { publicCourses } from "../../data";

export default function DiscoverPage() {
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const [reactions, setReactions] = useState<Record<string, "up" | "down" | undefined>>({});
  return (
    <AppShell title="Learn / Discover">
      <span className="eyebrow">Public course library</span><h1>Learn from useful sources.</h1>
      <p className="page-subtitle">Search courses, inspect their source material, follow creators, and signal whether a public course helped you.</p>
      <label className="search-bar"><Icon name="search" /><input aria-label="Search public library" defaultValue="distributed systems" /><button className="primary-button" type="button">Search</button></label>
      <div className="public-course-grid content-section">
        {publicCourses.map((course) => (
          <article className="public-course" key={course.title}>
            <div className="course-cover"><Icon name={course.icon} /></div>
            <div className="public-course-body"><h3>{course.title}</h3><p>{course.detail}</p>
              <div className="creator-row"><span className="avatar">{course.initials}</span><span><strong>{course.creator}</strong><small>{course.followers} followers</small></span><button className="text-button accent" onClick={() => setFollowed((current) => ({ ...current, [course.title]: !current[course.title] }))} type="button">{followed[course.title] ? "Following" : "Follow"}</button></div>
              <div className="reaction-row"><button className={reactions[course.title] === "up" ? "active" : ""} onClick={() => setReactions((current) => ({ ...current, [course.title]: current[course.title] === "up" ? undefined : "up" }))} type="button"><Icon name="thumbs-up" />{course.likes}</button><button className={reactions[course.title] === "down" ? "active" : ""} onClick={() => setReactions((current) => ({ ...current, [course.title]: current[course.title] === "down" ? undefined : "down" }))} type="button"><Icon name="thumbs-down" />{course.dislikes}</button><button className="text-button course-open" type="button">View course <Icon name="arrow-right" /></button></div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
