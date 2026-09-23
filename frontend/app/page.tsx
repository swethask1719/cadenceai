"use client";

import { useState } from "react";

export default function Home() {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    console.log("Signup submitted:", signup);
    setNotice(`Welcome, ${signup.name || "friend"}! Your account is ready.`);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login submitted:", login);
    setNotice(`Welcome back, ${login.email || "user"}!`);
  }

  return (
    <main className="split">
      <div className="divider" />

      {/* ---------------- LEFT: SIGN UP ---------------- */}
      <section className="pane pane-left">
        <span className="orb orb-1" />
        <div className="card">
          <div className="brand">
            <div className="logo">C</div>
            <div>
              <div className="brand-name">Cadence AI</div>
              <div className="brand-sub">Create account</div>
            </div>
          </div>

          <h2 className="title">Get started</h2>
          <p className="subtitle">
            Join thousands building with voice-first AI. It only takes a minute.
          </p>

          <form onSubmit={handleSignup}>
            <div className="field">
              <label htmlFor="su-name">Full name</label>
              <input
                id="su-name"
                type="text"
                placeholder="Ada Lovelace"
                value={signup.name}
                onChange={(e) =>
                  setSignup({ ...signup, name: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="su-email">Email</label>
              <input
                id="su-email"
                type="email"
                placeholder="you@example.com"
                value={signup.email}
                onChange={(e) =>
                  setSignup({ ...signup, email: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="su-pass">Password</label>
              <input
                id="su-pass"
                type="password"
                placeholder="••••••••"
                value={signup.password}
                onChange={(e) =>
                  setSignup({ ...signup, password: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="btn">
              Create account
            </button>
          </form>

          <div className="divider-text">OR</div>

          <div className="oauth">
            <button type="button" onClick={() => setNotice("Google signup coming soon")}>
              Google
            </button>
            <button type="button" onClick={() => setNotice("GitHub signup coming soon")}>
              GitHub
            </button>
          </div>

          <p className="footer-note">
            Already have an account?{" "}
            <a className="link" href="#login">
              Log in →
            </a>
          </p>
        </div>
      </section>

      {/* ---------------- RIGHT: LOG IN ---------------- */}
      <section className="pane pane-right" id="login">
        <span className="orb orb-2" />
        <div className="card">
          <div className="brand">
            <div className="logo">C</div>
            <div>
              <div className="brand-name">Cadence AI</div>
              <div className="brand-sub">Welcome back</div>
            </div>
          </div>

          <h2 className="title">Log in</h2>
          <p className="subtitle">
            Pick up right where you left off. Your workspace is waiting.
          </p>

          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="li-email">Email</label>
              <input
                id="li-email"
                type="email"
                placeholder="you@example.com"
                value={login.email}
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="li-pass">Password</label>
              <input
                id="li-pass"
                type="password"
                placeholder="••••••••"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                required
              />
            </div>

            <div className="row">
              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a className="link" href="#forgot">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn">
              Log in
            </button>
          </form>

          <div className="divider-text">OR</div>

          <div className="oauth">
            <button type="button" onClick={() => setNotice("Google login coming soon")}>
              Google
            </button>
            <button type="button" onClick={() => setNotice("GitHub login coming soon")}>
              GitHub
            </button>
          </div>

          <p className="footer-note">
            New here?{" "}
            <a className="link" href="#top">
              Create an account →
            </a>
          </p>
        </div>
      </section>

      {notice && (
        <div
          role="status"
          onClick={() => setNotice(null)}
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            padding: "0.85rem 1.25rem",
            borderRadius: "14px",
            background: "rgba(20, 10, 43, 0.9)",
            border: "1px solid rgba(168,85,247,0.5)",
            boxShadow: "0 12px 30px -12px rgba(0,0,0,0.8)",
            fontSize: "0.88rem",
            cursor: "pointer",
          }}
        >
          {notice}
        </div>
      )}
    </main>
  );
}