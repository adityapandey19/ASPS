import React from "react";

const ProgressBar = ({ value = 0, max = 100, color = "#4F9DFF", label, showValue = true, height = 6 }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div style={{ width: "100%" }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          {label && (
            <span style={{ fontSize: "12px", color: "#A0A0A0" }}>{label}</span>
          )}
          {showValue && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color,
                marginLeft: "auto",
              }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: `${height}px`,
          background: "#1E1E1E",
          borderRadius: height,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: height,
            transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            position: "relative",
          }}
        >
          {pct > 10 && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "0 2px 2px 0",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
