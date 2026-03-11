import React, { useState } from "react";
import ExposureSelector from "./ExposureSelector";

const complexityColors = { Easy: "#3AE374", Medium: "#FFA502", Hard: "#FF4757" };

const TopicCard = ({ topic, onExposureChange }) => {
  const [expanded, setExpanded] = useState(false);
  const ccColor = complexityColors[topic.complexity] || "#888";

  return (
    <div
      style={{
        background: "#141414",
        border: "1px solid #1E1E1E",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          cursor: "pointer",
        }}
        onClick={() => setExpanded((e) => !e)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: topic.completed ? "#3AE374" : "#1A1A1A",
              border: `2px solid ${topic.completed ? "#3AE374" : "#333"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {topic.completed && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: topic.completed ? "#666" : "#ddd",
              textDecoration: topic.completed ? "line-through" : "none",
            }}
          >
            {topic.name}
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              padding: "1px 6px",
              borderRadius: "3px",
              background: `${ccColor}15`,
              color: ccColor,
              border: `1px solid ${ccColor}25`,
            }}
          >
            {topic.complexity}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div onClick={(e) => e.stopPropagation()}>
            <ExposureSelector
              value={topic.exposure}
              onChange={(v) => onExposureChange?.(topic.id, v)}
            />
          </div>

          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#555"
            strokeWidth="2"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Subtopics */}
      {expanded && topic.subtopics?.length > 0 && (
        <div
          style={{
            borderTop: "1px solid #1A1A1A",
            padding: "8px 16px 12px 48px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            animation: "fadeInUp 0.2s ease",
          }}
        >
          {topic.subtopics.map((sub) => (
            <div
              key={sub.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #111",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: sub.completed ? "#3AE374" : "#333",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    color: sub.completed ? "#555" : "#aaa",
                    textDecoration: sub.completed ? "line-through" : "none",
                  }}
                >
                  {sub.name}
                </span>
              </div>
              <ExposureSelector
                value={sub.exposure}
                onChange={(v) => onExposureChange?.(sub.id, v)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicCard;
