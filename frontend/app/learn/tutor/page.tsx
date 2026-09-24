"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell";
import { Icon } from "../../components/Icon";

type SupportTab = "references" | "illustrations" | "exercises";

export default function TutorPage() {
  const [supportTab, setSupportTab] = useState<SupportTab>("references");
  const [listening, setListening] = useState(true);

  return (
    <AppShell title="Learn / Tutor session">
      <span className="eyebrow">Backend Systems · Module 3</span><h1>Transactions and isolation levels</h1>
      <p className="page-subtitle">The tutor keeps conversation central while supporting it with the exact source, visual explanation, or exercise needed now.</p>
      <div className="tutor-layout content-section">
        <article className="panel tutor-stage">
          <div className="tutor-heading"><div><span className={`live-status ${!listening ? "paused" : ""}`}>{listening ? "Tutor listening" : "Session paused"}</span><h2>Explain what a dirty read is.</h2></div><button className="secondary-button" type="button"><Icon name="message" />Use text</button></div>
          <div className="voice-zone"><button className={`voice-orb ${!listening ? "paused" : ""}`} onClick={() => setListening((value) => !value)} type="button" aria-label={listening ? "Pause listening" : "Resume listening"}><Icon name={listening ? "mic" : "audio"} /></button><h2>{listening ? "Speak naturally" : "Ready when you are"}</h2><p>{listening ? "The tutor will wait until you finish." : "Tap the button to resume the conversation."}</p></div>
          <div className="transcript"><div className="transcript-line"><b>Tutor</b><span>Two transactions are reading the same customer balance. What could go wrong?</span></div><div className="transcript-line"><b>You</b><span>One transaction might read data the other changed but has not committed yet.</span></div></div>
        </article>

        <aside className="panel tutor-support">
          <div className="support-tabs" role="tablist" aria-label="Tutor support panel">
            {([['references','library','References'],['illustrations','image','Illustrations'],['exercises','checklist','Exercises']] as const).map(([tab,icon,label]) => <button className={supportTab === tab ? "active" : ""} key={tab} onClick={() => setSupportTab(tab)} type="button"><Icon name={icon} />{label}</button>)}
          </div>
          {supportTab === "references" && <div className="support-content"><span className="eyebrow">Course sources</span><div className="reference-item"><strong>Database Transactions</strong><span>Creator notes · highlighted section 3.2</span></div><div className="reference-item"><strong>PostgreSQL documentation</strong><span>Transaction isolation · external reference</span></div><div className="reference-item"><strong>ACID Cheatsheet.pdf</strong><span>Page 4 · concurrency anomalies</span></div><button className="secondary-button block" type="button"><Icon name="plus" />Add personal note</button></div>}
          {supportTab === "illustrations" && <div className="support-content"><span className="eyebrow">Current concept</span><div className="concept-illustration"><div><strong>Transaction A</strong><span>Changes $100 → $80</span></div><Icon name="arrow-right" /><div><strong>Transaction B</strong><span>Reads $80 before commit</span></div></div><p className="support-copy">A dirty read happens when uncommitted data becomes visible to another transaction.</p><button className="secondary-button block" type="button">Show another example</button></div>}
          {supportTab === "exercises" && <div className="support-content"><span className="eyebrow">Practice queue</span><h2>Choose what happens next</h2><div className="exercise-list"><button type="button"><strong>Scenario check</strong><span>Identify the anomaly in a banking example</span></button><button type="button"><strong>Guided exercise</strong><span>Choose an isolation level and explain why</span></button><button type="button"><strong>Independent challenge</strong><span>Design a safe inventory update</span></button></div></div>}
        </aside>
      </div>
    </AppShell>
  );
}
