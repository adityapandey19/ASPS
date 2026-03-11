import React, { useState } from "react";

const EXPOSURE_LEVELS = [
  { value: 0, label: "Not Studied", color: "#444" },
  { value: 1, label: "Read", color: "#4F9DFF" },
  { value: 2, label: "Practiced", color: "#9B59B6" },
  { value: 3, label: "Revised", color: "#3AE374" },
  { value: 4, label: "Tested", color: "#FFA502" },
];

const ExposureSelector = ({ value = 0, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = EXPOSURE_LEVELS[value] || EXPOSURE_LEVELS[0];

  const handleSelect = (level) => {
    onChange?.(level.value);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => !disabled && setIsOpen((o) => !o)}
        disabled={disabled}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "#1A1A1A",
          border: `1px solid ${current.color}44`,
          borderRadius: "5px",
          padding: "4px 10px",
          color: current.color,
          fontSize: "11px",
          fontFamily: "var(--font-mono)",
          cursor: disabled ? "default" : "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.15s ease",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: current.color,
            flexShrink: 0,
          }}
        />
        {current.label}
        {!disabled && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.15s" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 200,
            background: "#141414",
            border: "1px solid #2A2A2A",
            borderRadius: "6px",
            overflow: "hidden",
            minWidth: "140px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            animation: "fadeInUp 0.15s ease",
          }}
        >
          {EXPOSURE_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => handleSelect(level)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 12px",
                background: value === level.value ? `${level.color}12` : "transparent",
                border: "none",
                color: value === level.value ? level.color : "#888",
                fontSize: "12px",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${level.color}18`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = value === level.value ? `${level.color}12` : "transparent")}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: level.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#444", width: "12px" }}>
                {level.value}
              </span>
              {level.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExposureSelector;
export { EXPOSURE_LEVELS };
