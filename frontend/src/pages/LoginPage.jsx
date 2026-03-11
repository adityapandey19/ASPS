import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault?.();
    setError("");
    setLoading(true);

    try {
      // Try real API first, fall back to mock
      const res = await login(email, password).catch(() => {
        // Mock auth for demo
        if (email && password) {
          return { token: "mock-token-123", user: { name: email.split("@")[0], email } };
        }
        throw new Error("Invalid credentials");
      });
      localStorage.setItem("asps_token", res.token);
      localStorage.setItem("asps_user", JSON.stringify(res.user));
      onLogin?.(res.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Try any email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B0B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79,157,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,157,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,157,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="fade-in"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#4F9DFF",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            ▸ ASPS v1.0
          </div>
          <h1
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "22px",
              color: "#fff",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            ADAPTIVE STUDY
          </h1>
          <h1
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "22px",
              color: "#4F9DFF",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            PLANNING SYSTEM
          </h1>
          <div style={{ fontSize: "13px", color: "#555", marginTop: "8px" }}>
            Sign in to your learning dashboard
          </div>
        </div>

        {/* Form */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1E1E1E",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(255,71,87,0.1)",
                border: "1px solid rgba(255,71,87,0.3)",
                borderRadius: "6px",
                padding: "10px 14px",
                marginBottom: "20px",
                color: "#FF4757",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#666",
                letterSpacing: "1.5px",
                marginBottom: "8px",
              }}
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              style={{
                width: "100%",
                background: "#0D0D0D",
                border: "1px solid #222",
                borderRadius: "6px",
                padding: "10px 14px",
                color: "#ddd",
                fontSize: "14px",
                outline: "none",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4F9DFF")}
              onBlur={(e) => (e.target.style.borderColor = "#222")}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#666",
                letterSpacing: "1.5px",
                marginBottom: "8px",
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              style={{
                width: "100%",
                background: "#0D0D0D",
                border: "1px solid #222",
                borderRadius: "6px",
                padding: "10px 14px",
                color: "#ddd",
                fontSize: "14px",
                outline: "none",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4F9DFF")}
              onBlur={(e) => (e.target.style.borderColor = "#222")}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#1A2A3A" : "linear-gradient(135deg, #3a8ae0, #4F9DFF)",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.5px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {loading ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "2px" }}>
                AUTHENTICATING...
              </span>
            ) : (
              "Sign In →"
            )}
          </button>

          <div
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "#333",
              letterSpacing: "1px",
            }}
          >
            DEMO: use any email + password
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
