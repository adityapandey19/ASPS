import React, { useState } from "react";
import StudyPlanCard from "../components/StudyPlanCard";
import { mockStudyPlan } from "../data/mockData";

const PlannerPage = () => {
  const [hours, setHours] = useState(3);
  const [plan, setPlan] = useState(mockStudyPlan);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    setGenerated(false);
    // TODO: const res = await api.getStudyPlan(hours)
    setTimeout(() => {
      setPlan({ ...mockStudyPlan, hours });
      setLoading(false);
      setGenerated(true);
    }, 1200);
  };

  const totalMinutes = plan.topics.reduce((a, t) => a + t.duration, 0);

  return (
    <div style={{ padding: "28px", maxWidth: "800px" }}>
      {/* Header */}
      <div className="fade-in" style={{ marginBottom: "28px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "2px", marginBottom: "4px" }}>
          STUDY PLANNER
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#eee" }}>Generate Study Plan</h1>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
          Tell us how much time you have and we'll build an optimal plan.
        </p>
      </div>

      {/* Input section */}
      <div className="card fade-in-delay-1" style={{ padding: "24px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "20px" }}>
          CONFIGURATION
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#666", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
              AVAILABLE HOURS
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: "#4F9DFF", cursor: "pointer" }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "20px", color: "#4F9DFF", minWidth: "48px" }}>
                {hours}h
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#444" }}>{h}</span>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "12px 28px",
              background: loading ? "#1A2A3A" : "linear-gradient(135deg, #3a8ae0, #4F9DFF)",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "opacity 0.2s",
              flexShrink: 0,
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Generating...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Generate Plan
              </>
            )}
          </button>
        </div>
      </div>

      {/* Plan output */}
      {generated && (
        <div className="fade-in">
          {/* Plan meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#4F9DFF",
                letterSpacing: "1.5px",
              }}
            >
              RECOMMENDED PLAN — {plan.hours}H SESSION
            </div>
            <div style={{ flex: 1, height: "1px", background: "#1A1A1A" }} />
            <div style={{ display: "flex", gap: "16px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555" }}>
                {plan.topics.length} TOPICS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555" }}>
                {totalMinutes} MIN
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {plan.topics.map((t, i) => (
              <StudyPlanCard key={t.id} topic={t} index={i} />
            ))}
          </div>

          {/* Time breakdown */}
          <div className="card" style={{ padding: "16px 20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "1.5px", marginBottom: "12px" }}>
              TIME BREAKDOWN
            </div>
            <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", gap: "2px" }}>
              {plan.topics.map((t, i) => {
                const colors = ["#4F9DFF", "#3AE374", "#FFA502", "#9B59B6"];
                return (
                  <div
                    key={t.id}
                    style={{
                      flex: t.duration,
                      background: colors[i % colors.length],
                      borderRadius: "4px",
                    }}
                    title={`${t.name}: ${t.duration}min`}
                  />
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "10px", flexWrap: "wrap" }}>
              {plan.topics.map((t, i) => {
                const colors = ["#4F9DFF", "#3AE374", "#FFA502", "#9B59B6"];
                return (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: colors[i % colors.length] }} />
                    <span style={{ fontSize: "11px", color: "#888" }}>{t.name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555" }}>{t.duration}m</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default PlannerPage;
