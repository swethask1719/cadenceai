import { AppShell } from "../../components/AppShell";
import { Icon } from "../../components/Icon";

const concepts = [["HTTP",91,"Retained"],["REST",84,"Review soon"],["Databases",73,"Improving"],["Transactions",58,"Practicing"],["Isolation",42,"Building"],["Replication",0,"Not started"],["Consistency",0,"Not started"],["Distributed systems",34,"Early"]] as const;

export default function ProgressPage() {
  return (
    <AppShell title="Learn / Progress">
      <span className="eyebrow">Across every course</span><h1>Your persistent learning map.</h1>
      <p className="page-subtitle">Concept mastery follows you across public and private courses, so each new learning path starts from what you already know.</p>
      <div className="concept-grid content-section">{concepts.map(([name,value,state]) => <article className={`concept-card ${value >= 70 ? "strong" : value > 0 && value < 60 ? "review" : ""}`} key={name}><div className="concept-value">{value ? `${value}%` : "—"}</div><h3>{name}</h3><p>{state}</p></article>)}</div>
      <article className="panel review-panel content-section"><span className="large-tile-icon"><Icon name="refresh" /></span><span><h2>Four concepts are ready for recall</h2><p>Eight minutes now will reinforce them before the predicted forgetting window.</p></span><button className="primary-button" type="button">Start review</button></article>
    </AppShell>
  );
}
