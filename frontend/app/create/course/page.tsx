import { AppShell } from "../../components/AppShell";
import { Icon } from "../../components/Icon";

const lessons = [
  ["book-open","Relational modeling","Explanation · guided exercise · quiz","Ready"],
  ["audio","Transactions and ACID","Voice lesson · scenario practice","Ready"],
  ["checklist","Isolation levels","Adaptive lesson · assessment","Review"],
  ["code","Design a payment ledger","Module project · rubric","Draft"],
] as const;

export default function CourseStudioPage() {
  return (
    <AppShell title="Create / Course studio">
      <div className="title-row"><div><span className="eyebrow">Course studio · private draft</span><h1>Backend Systems</h1><p>18 sources · 4 modules · last refined today</p></div><button className="primary-button" type="button"><Icon name="globe" />Review to publish</button></div>
      <div className="studio-layout content-section">
        <aside className="panel outline-panel"><div className="section-heading"><h2>Outline</h2><button className="icon-button" aria-label="Add module" type="button"><Icon name="plus" /></button></div><button type="button"><strong>1 · Web foundations</strong><span>5 lessons · ready</span></button><button type="button"><strong>2 · API design</strong><span>6 lessons · ready</span></button><button className="active" type="button"><strong>3 · Databases</strong><span>7 lessons · editing</span></button><button type="button"><strong>4 · Distributed systems</strong><span>4 lessons · draft</span></button></aside>
        <article className="panel"><div className="section-heading"><div><span className="eyebrow">Module 3</span><h2>Databases and transactions</h2></div><button className="secondary-button" type="button"><Icon name="sparkles" />Refine with AI</button></div><p className="module-copy">Learners will model relational data, reason about transactions, and choose safe isolation levels.</p><div className="studio-list">{lessons.map(([icon,title,detail,state]) => <div className="studio-row" key={title}><span className="tile-icon"><Icon name={icon} /></span><span><strong>{title}</strong><small>{detail}</small></span><b>{state}</b></div>)}</div><button className="secondary-button" type="button"><Icon name="plus" />Add lesson or activity</button></article>
      </div>
    </AppShell>
  );
}
