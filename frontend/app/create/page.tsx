import Link from "next/link";
import { AppShell } from "../components/AppShell";
import { Icon } from "../components/Icon";
import { creatorCourses } from "../data";

export default function CreatorHomePage() {
  return (
    <AppShell title="Create / Creator home">
      <span className="eyebrow">Creator home</span><h1>Turn a source into a learning experience.</h1>
      <p className="page-subtitle">Start private. Add your material, shape the course with AI, learn from it yourself, and publish only when it is useful for others.</p>
      <div className="creator-start content-section">
        <section className="source-drop"><span className="eyebrow">Create from source</span><h2>What do you want to learn or teach?</h2><p>Cadence will propose objectives, modules, exercises, and assessments. You stay in control.</p><div className="source-actions"><button type="button"><Icon name="upload" />Upload files</button><button type="button"><Icon name="link" />Add URL</button><button type="button"><Icon name="notes" />Write notes</button></div></section>
        <aside className="panel"><div className="section-heading"><h2>Source library</h2><span>18 items</span></div><div className="list"><div className="list-row compact"><span className="tile-icon"><Icon name="file" /></span><span><strong>ACID Cheatsheet.pdf</strong><small>Used in Backend Systems</small></span></div><div className="list-row compact"><span className="tile-icon"><Icon name="globe" /></span><span><strong>PostgreSQL documentation</strong><small>Synced 2 days ago</small></span></div></div></aside>
      </div>
      <section className="content-section"><div className="section-heading"><h2>Your courses</h2><span>Private by default</span></div><div className="course-grid">
        {creatorCourses.map((course,index) => <article className={`course-card ${index === 0 ? "featured" : ""}`} key={course.title}><div className="card-top"><span className="tile-icon"><Icon name={course.icon} /></span><span className="chip">{course.badge}</span></div><h3>{course.title}</h3><p>{course.detail}</p>{index === 0 ? <Link className="secondary-button inline" href="/create/course">Continue refining</Link> : <button className="secondary-button inline" type="button">View insights</button>}</article>)}
        <article className="course-card"><div className="card-top"><span className="tile-icon"><Icon name="sparkles" /></span><span className="chip">Idea</span></div><h3>Start another course</h3><p>Bring a source and let the course assistant propose a first structure.</p><button className="secondary-button inline" type="button">Create new</button></article>
      </div></section>
    </AppShell>
  );
}
