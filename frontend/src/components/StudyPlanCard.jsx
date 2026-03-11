import React from "react";

const complexityColors = { Easy: "#3AE374", Medium: "#FFA502", Hard: "#FF4757" };
const priorityColors = { High: "#FF4757", Medium: "#FFA502", Low: "#4F9DFF" };

const StudyPlanCard = ({ topic, index, onClick }) => {
  const ccColor = complexityColors[topic.complexity] || "#888";
  const pcColor = priorityColors[topic.priority] || "#888";

  return (
    <div
      onClick={() => onClick?.(topic)}
      style={{
        background: "#141414",
        border: "1px solid #1E1E1E",
        borderRadius: "8px",
        padding: "14px 16px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,157,255,0.3)";
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1E1E1E";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: pcColor,
          borderRadius: "8px 0 0 8px",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "18px",
              fontWeight: "700",
              color: "#333",
              minWidth: "28px",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#eee", marginBottom: "4px" }}>
              {topic.name}
            </div>
            <div style={{ fontSize: "11px", color: "#555" }}>{topic.unit}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "6px", flexDirection: "column", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              padding: "2px 7px",
              borderRadius: "3px",
              background: `${ccColor}18`,
              color: ccColor,
              border: `1px solid ${ccColor}33`,
            }}
          >
            {topic.complexity}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF" }}>
            {topic.duration}m
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCard;
