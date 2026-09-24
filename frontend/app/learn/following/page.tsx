import { AppShell } from "../../components/AppShell";
import { Icon } from "../../components/Icon";

export default function FollowingPage() {
  return (
    <AppShell title="Learn / Following">
      <span className="eyebrow">Your learning network</span><h1>People, sources, and progress.</h1>
      <p className="page-subtitle">Follow learners and creators without turning learning into a popularity contest. Progress sharing stays intentional.</p>
      <div className="two-column content-section">
        <section className="panel"><div className="section-heading"><h2>Following feed</h2><span>24 people</span></div><div className="feed-list large"><div className="feed-row"><span className="avatar">AS</span><span><strong>Asha Menon published a course</strong><small>Product Analytics in Practice · 11 sources</small></span><time>2h</time></div><div className="feed-row"><span className="avatar">MI</span><span><strong>Maya Iyer completed a project</strong><small>Built a distributed queue simulator</small></span><time>5h</time></div><div className="feed-row"><span className="avatar">JL</span><span><strong>Jon Lee reached a milestone</strong><small>Completed module 6 of Advanced Python</small></span><time>1d</time></div></div></section>
        <aside className="panel"><div className="section-heading"><h2>Followed sources</h2><span>7 sources</span></div><div className="list"><div className="list-row compact"><span className="tile-icon"><Icon name="file" /></span><span><strong>Designing Data-Intensive Applications</strong><small>Used in 18 public courses</small></span></div><div className="list-row compact"><span className="tile-icon"><Icon name="globe" /></span><span><strong>PostgreSQL Docs</strong><small>3 new referenced sections</small></span></div><div className="list-row compact"><span className="tile-icon"><Icon name="file" /></span><span><strong>System Design Notes</strong><small>Updated yesterday by Maya</small></span></div></div></aside>
      </div>
    </AppShell>
  );
}
