import React from "react";

const Navbar = ({ user }) => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <header
      style={{
        height: "52px",
        background: "#0D0D0D",
        borderBottom: "1px solid #1E1E1E",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#3AE374",
            animation: "pulse-glow 2s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#3AE374",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          ASPS // ADAPTIVE STUDY PLANNING SYSTEM
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#555" }}>
          {dateStr} · {timeStr}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#1A1A1A",
            border: "1px solid #222",
            borderRadius: "6px",
            padding: "4px 10px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F9DFF, #9B59B6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "S"}
          </div>
          <span style={{ fontSize: "13px", color: "#ccc" }}>{user?.name || "Student"}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
