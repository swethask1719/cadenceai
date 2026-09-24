import Link from "next/link";
import { AppShell } from "../components/AppShell";
import { Icon } from "../components/Icon";
import { activeCourses } from "../data";

export default function LearnHomePage() {
  return (
    <AppShell title="Learn / Home">
      <span className="eyebrow">Your learning space</span>
      <h1>What do you want to learn today?</h1>
      <p className="page-subtitle">Continue an active course, revisit something you completed, or search the public library for a new source.</p>
      <form action="/learn/discover" className="search-bar">
        <Icon name="search" />
        <input aria-label="Search public courses" name="q" placeholder="Search public courses, topics, creators, or sources" />
        <button className="primary-button" type="submit">Search courses</button>
      </form>
      <section className="content-section">
        <div className="section-heading"><h2>Continue learning</h2><span>3 ongoing courses</span></div>
        <div className="course-grid">
          {activeCourses.map((course, index) => (
            <article className={`course-card ${index === 0 ? "featured" : ""}`} key={course.id}>
              <div className="card-top"><span className="tile-icon"><Icon name={course.icon} /></span><span className="chip">{course.badge}</span></div>
              <h3>{course.title}</h3><p>{course.detail}</p>
              <div className="progress-bar" aria-label={`${course.progress}% complete`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={course.progress}><span style={{ width: `${course.progress}%` }} /></div>
              <div className="card-footer"><small>{course.progress}% complete</small>{index === 0 ? <Link className="text-link" href="/learn/tutor">Continue <Icon name="arrow-right" /></Link> : <button className="text-button" type="button">{course.badge === "Review due" ? "Review" : "Resume"}</button>}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section dashboard-lower">
        <article className="panel">
          <div className="section-heading"><h2>Review past courses</h2><span>Maintain what you learned</span></div>
          <div className="list">
            <div className="list-row"><span className="tile-icon"><Icon name="code" /></span><span><strong>Java Fundamentals</strong><small>Completed 2 months ago · 6 concepts need review</small></span><button className="secondary-button" type="button">Review</button></div>
            <div className="list-row"><span className="tile-icon"><Icon name="git" /></span><span><strong>Git in Practice</strong><small>Completed 5 months ago · retention strong</small></span><button className="secondary-button" type="button">Open</button></div>
          </div>
        </article>
        <aside className="panel">
          <div className="section-heading"><h2>From people you follow</h2><Link href="/learn/following">See all</Link></div>
          <div className="feed-list">
            <div className="feed-row"><span className="avatar">AS</span><span><strong>Asha published a course</strong><small>Product Analytics in Practice</small></span><time>2h</time></div>
            <div className="feed-row"><span className="avatar">MI</span><span><strong>Maya completed a project</strong><small>Distributed queue simulator</small></span><time>5h</time></div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
