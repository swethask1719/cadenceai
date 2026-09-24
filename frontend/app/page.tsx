"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./components/Icon";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [role, setRole] = useState<"learn" | "create">("learn");
  const [notice, setNotice] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(mode === "signup" ? "Your mock account is ready." : "Welcome back.");
    window.setTimeout(() => router.push(role === "create" ? "/create" : "/learn"), 450);
  }

  return (
    <main className="auth-page">
      <section className="auth-story">
        <div className="auth-brand"><span className="brand-mark">C</span><span>Cadence</span></div>
        <div className="auth-copy">
          <span className="eyebrow">Learn with direction</span>
          <h1>An expert tutor that changes with you.</h1>
          <p>Bring any source, turn it into a living course, and learn through conversation, practice, projects, and review.</p>
          <div className="feature-list">
            <div><span className="feature-icon"><Icon name="audio" /></span><span><strong>Live adaptive tutoring</strong><small>Voice and text sessions that respond to how you learn.</small></span></div>
            <div><span className="feature-icon"><Icon name="progress" /></span><span><strong>Concept-level progress</strong><small>See what you know, what needs review, and why.</small></span></div>
            <div><span className="feature-icon"><Icon name="courses" /></span><span><strong>Create and share courses</strong><small>Keep sources private or publish them for the community.</small></span></div>
          </div>
        </div>
        <p className="auth-footnote">Your learning, sources, and model preferences stay under your control.</p>
      </section>

      <section className="auth-form-side">
        <div className="auth-card">
          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">Sign up</button>
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} type="button">Log in</button>
          </div>
          <span className="eyebrow">{mode === "signup" ? "Create your account" : "Welcome back"}</span>
          <h2>{mode === "signup" ? "Start learning your way." : "Continue where you left off."}</h2>
          <p className="form-intro">One account lets you learn, create, follow, and publish.</p>
          {mode === "signup" && (
            <div className="role-choice" aria-label="Starting workspace">
              <button className={role === "learn" ? "active" : ""} onClick={() => setRole("learn")} type="button"><Icon name="book-open" />I want to learn</button>
              <button className={role === "create" ? "active" : ""} onClick={() => setRole("create")} type="button"><Icon name="sparkles" />I want to create</button>
            </div>
          )}
          <form onSubmit={submit}>
            {mode === "signup" && <label>Full name<input autoComplete="name" placeholder="Ada Lovelace" required /></label>}
            <label>Email<input autoComplete="email" placeholder="you@example.com" type="email" required /></label>
            <label>Password<input autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="At least 8 characters" type="password" required /></label>
            {mode === "login" && <div className="form-row"><label className="checkbox-label"><input defaultChecked type="checkbox" />Remember me</label><button className="text-button" type="button">Forgot password?</button></div>}
            <button className="primary-button block" type="submit">{mode === "signup" ? "Create account" : "Log in"}<Icon name="arrow-right" /></button>
          </form>
          <div className="or-divider"><span>or continue with</span></div>
          <div className="oauth-row"><button className="secondary-button" type="button">Google</button><button className="secondary-button" type="button">GitHub</button></div>
          {notice && <p className="form-notice" role="status">{notice}</p>}
        </div>
      </section>
    </main>
  );
}
