import { useState } from "react";
import { api, isAdmin } from "../services/api";

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  currentUser = null,
  onLogout = null,
  onNavigate = null
}) {
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register' | 'forgot'
  const [loginData, setLoginData] = useState({ emailOrPhone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Guntur",
    password: "",
    confirmPassword: ""
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!loginData.emailOrPhone || !loginData.password) {
      setError("Please enter your email or phone and password.");
      return;
    }
    setLoading(true);
    try {
      const user = await api.login({
        email: loginData.emailOrPhone,
        password: loginData.password
      });
      setLoading(false);
      const isUserAdmin = isAdmin(user);
      if (onAuthSuccess) onAuthSuccess(user);
      if (onNavigate) {
        onNavigate(isUserAdmin ? "admin" : "client-portal");
      }
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to log in. Please check your credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await api.register({
        fullName: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        city: registerData.city,
        password: registerData.password
      });
      setLoading(false);
      setSuccessMsg("Account registered successfully! You can now log in to track your interior projects.");
      setAuthMode("login");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed.");
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError("Please enter your registered email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Password reset link has been dispatched to your email.");
      setAuthMode("login");
    }, 600);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="auth-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <div className="auth-brand-badge">
            <span className="badge-spark">✦</span>
            <span>{currentUser ? "ACCOUNT SESSION" : "ICON INTERIORS CLIENT PORTAL"}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {currentUser ? (
          <div className="auth-form-body" style={{ textAlign: "center", padding: "16px 8px 8px" }}>
            <div style={{ fontSize: "48px", marginBottom: "8px" }}>
              {isAdmin(currentUser) ? "👑" : "👤"}
            </div>
            <h3 style={{ color: "#ffffff", margin: "0 0 4px 0", fontSize: "1.35rem" }}>
              {currentUser.name || currentUser.fullName || "User"}
            </h3>
            <p style={{ color: "#9ca3af", margin: "0 0 16px 0", fontSize: "0.88rem" }}>
              {currentUser.email}
            </p>
            <div style={{ marginBottom: "24px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: isAdmin(currentUser) ? "rgba(230, 202, 101, 0.15)" : "rgba(56, 189, 248, 0.15)",
                  color: isAdmin(currentUser) ? "#e6ca65" : "#38bdf8",
                  border: `1px solid ${isAdmin(currentUser) ? "rgba(230, 202, 101, 0.4)" : "rgba(56, 189, 248, 0.4)"}`
                }}
              >
                {isAdmin(currentUser) ? "⚡ Studio Principal Architect (Admin)" : "Verified Client"}
              </span>
            </div>

            <button
              className="btn-gold-primary full-width"
              onClick={() => {
                if (onNavigate) {
                  onNavigate(isAdmin(currentUser) ? "admin" : "client-portal");
                }
                onClose();
              }}
            >
              {isAdmin(currentUser) ? "Open Studio Admin Dashboard ›" : "Open My Project Hub ›"}
            </button>

            <button
              type="button"
              className="portal-btn-logout full-width"
              style={{
                marginTop: "12px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                fontWeight: 600
              }}
              onClick={() => {
                if (onLogout) onLogout();
                onClose();
              }}
            >
              Sign Out of Account
            </button>
          </div>
        ) : (
          <>
            {/* Tab switchers */}
            <div className="auth-tabs-row">
              <button
                className={`auth-tab-btn ${authMode === "login" ? "active" : ""}`}
                onClick={() => { setAuthMode("login"); setError(""); setSuccessMsg(""); }}
              >
                Customer Login
              </button>
              <button
                className={`auth-tab-btn ${authMode === "register" ? "active" : ""}`}
                onClick={() => { setAuthMode("register"); setError(""); setSuccessMsg(""); }}
              >
                Create Account
              </button>
            </div>

        {error && <div className="auth-alert error">{error}</div>}
        {successMsg && <div className="auth-alert success">{successMsg}</div>}

        {/* LOGIN FORM */}
        {authMode === "login" && (
          <form className="auth-form-body" onSubmit={handleLoginSubmit}>
            <div className="input-field-group">
              <label>Email or Mobile Number</label>
              <input
                type="text"
                required
                placeholder="e.g. srinivas@example.com or 9885001008"
                value={loginData.emailOrPhone}
                onChange={(e) => setLoginData({ ...loginData, emailOrPhone: e.target.value })}
              />
            </div>

            <div className="input-field-group">
              <div className="label-with-action">
                <label>Password</label>
                <button
                  type="button"
                  className="link-forgot"
                  onClick={() => { setAuthMode("forgot"); setError(""); }}
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                placeholder="Enter your account password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-gold-primary full-width" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In to Client Portal ›"}
            </button>

            <div className="auth-footer-prompt">
              <span>Don't have a customer profile?</span>{" "}
              <button
                type="button"
                className="link-switch"
                onClick={() => { setAuthMode("register"); setError(""); }}
              >
                Register Here
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {authMode === "register" && (
          <form className="auth-form-body" onSubmit={handleRegisterSubmit}>
            <div className="modal-input-grid">
              <div className="input-field-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. K. Srinivas Rao"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                />
              </div>

              <div className="input-field-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98850 XXXXX"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-input-grid">
              <div className="input-field-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. srinivas@example.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
              </div>

              <div className="input-field-group">
                <label>City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guntur"
                  value={registerData.city}
                  onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-input-grid">
              <div className="input-field-group">
                <label>Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>

              <div className="input-field-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-gold-primary full-width" disabled={loading}>
              {loading ? "Creating Profile..." : "Create Customer Account ›"}
            </button>

            <div className="auth-footer-prompt">
              <span>Already registered?</span>{" "}
              <button
                type="button"
                className="link-switch"
                onClick={() => { setAuthMode("login"); setError(""); }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === "forgot" && (
          <form className="auth-form-body" onSubmit={handleForgotSubmit}>
            <div className="input-field-group">
              <label>Enter Registered Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. yourname@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-gold-primary full-width" disabled={loading}>
              {loading ? "Sending Link..." : "Send Password Reset Link ›"}
            </button>

            <div className="auth-footer-prompt">
              <button
                type="button"
                className="link-switch"
                onClick={() => { setAuthMode("login"); setError(""); }}
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}
        </>
        )}
      </div>
    </div>
  );
}

