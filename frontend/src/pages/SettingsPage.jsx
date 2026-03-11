import React, { useState } from "react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState("08:00");
  const [studyGoal, setStudyGoal] = useState(3);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: "40px",
        height: "22px",
        borderRadius: "11px",
        background: value ? "#4F9DFF" : "#222",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: value ? "21px" : "3px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
        }}
      />
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="card" style={{ padding: "20px", marginBottom: "16px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "16px" }}>
        {title}
      </div>
      {children}
    </div>
  );

  const Row = ({ label, sub, children }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #111" }}>
      <div>
        <div style={{ fontSize: "13px", color: "#ddd" }}>{label}</div>
        {sub && <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{sub}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ padding: "28px", maxWidth: "620px" }}>
      <div className="fade-in" style={{ marginBottom: "28px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "2px", marginBottom: "4px" }}>
          CONFIGURATION
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#eee" }}>Settings</h1>
      </div>

      <Section title="STUDY PREFERENCES">
        <Row label="Daily Study Goal" sub="Target hours per day">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="range" min="1" max="8" value={studyGoal}
              onChange={(e) => setStudyGoal(parseInt(e.target.value))}
              style={{ width: "100px", accentColor: "#4F9DFF" }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#4F9DFF", minWidth: "24px" }}>
              {studyGoal}h
            </span>
          </div>
        </Row>
        <Row label="Daily Reminder" sub="Get notified to start studying">
          <input
            type="time" value={dailyReminder}
            onChange={(e) => setDailyReminder(e.target.value)}
            style={{
              background: "#1A1A1A",
              border: "1px solid #222",
              borderRadius: "5px",
              padding: "5px 10px",
              color: "#ccc",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              outline: "none",
            }}
          />
        </Row>
      </Section>

      <Section title="NOTIFICATIONS">
        <Row label="Push Notifications" sub="Enable browser notifications">
          <Toggle value={notifications} onChange={setNotifications} />
        </Row>
        <Row label="Plan Alerts" sub="Notify when plan is ready">
          <Toggle value={true} onChange={() => {}} />
        </Row>
      </Section>

      <Section title="ACCOUNT">
        <Row label="API Endpoint" sub="Backend connection URL">
          <input
            defaultValue="http://localhost:8000"
            style={{
              background: "#0D0D0D",
              border: "1px solid #222",
              borderRadius: "5px",
              padding: "5px 10px",
              color: "#888",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              outline: "none",
              width: "200px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4F9DFF")}
            onBlur={(e) => (e.target.style.borderColor = "#222")}
          />
        </Row>
        <Row label="Clear Local Data" sub="Reset cached study data">
          <button
            style={{
              padding: "5px 12px",
              background: "transparent",
              border: "1px solid #FF4757",
              borderRadius: "5px",
              color: "#FF4757",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Clear
          </button>
        </Row>
      </Section>

      <button
        onClick={handleSave}
        style={{
          padding: "11px 28px",
          background: saved ? "rgba(58,227,116,0.15)" : "linear-gradient(135deg, #3a8ae0, #4F9DFF)",
          border: saved ? "1px solid #3AE374" : "none",
          borderRadius: "6px",
          color: saved ? "#3AE374" : "#fff",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          transition: "all 0.3s ease",
        }}
      >
        {saved ? "✓ Saved" : "Save Changes"}
      </button>
    </div>
  );
};

export default SettingsPage;
