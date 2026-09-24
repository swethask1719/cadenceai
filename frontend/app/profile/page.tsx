"use client";

import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { Icon } from "../components/Icon";

export default function ProfilePage() {
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <AppShell title="Profile / Settings">
      <span className="eyebrow">Account and preferences</span><h1>Your profile.</h1><p className="page-subtitle">One identity for learning, creating, following, and publishing.</p>
      <div className="settings-layout content-section">
        <aside className="panel profile-card"><span className="big-avatar">NM</span><h2>Nisarg Mankodi</h2><p>Learning in public, building useful courses.</p><div className="profile-stats"><span><strong>24</strong><small>Following</small></span><span><strong>186</strong><small>Followers</small></span><span><strong>3</strong><small>Courses</small></span></div><button className="secondary-button block" type="button">Edit public profile</button></aside>
        <section className="panel settings-panel"><div className="section-heading"><div><h2>AI model settings</h2><span>Used for your private tutor and creator assistant</span></div></div><form className="settings-form" onSubmit={save}>
          <label>API key<div className="input-with-button"><Icon name="key" /><input defaultValue="sk-demo-cadence-key" type={showKey ? "text" : "password"} /><button className="text-button" onClick={() => setShowKey((value) => !value)} type="button">{showKey ? "Hide" : "Show"}</button></div></label><p className="settings-note"><Icon name="lock" />Keys will be masked and should be encrypted before backend storage. They must never appear in public course data.</p>
          <div className="form-grid"><label>Reasoning model<select defaultValue="gemini-pro"><option value="gemini-pro">Gemini 3.5 Pro</option><option value="gemini-flash">Gemini 3.5 Flash</option><option value="platform">Use platform default</option></select></label><label>Voice model<select defaultValue="gemini-live"><option value="gemini-live">Gemini Live Voice</option><option value="platform">Use platform default</option></select></label></div>
          <hr /><div className="section-heading"><div><h2>Progress visibility</h2><span>Choose what followers can see</span></div></div><label>Default sharing<select defaultValue="milestones"><option value="milestones">Milestones only</option><option value="public-progress">All public-course progress</option><option value="private">Private</option></select></label>
          <div className="save-row"><button className="primary-button" type="submit">Save settings</button>{saved && <span className="save-notice" role="status">Settings saved locally.</span>}</div>
        </form></section>
      </div>
    </AppShell>
  );
}
