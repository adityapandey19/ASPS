import React from "react";

const intensityColors = [
  "#111111", // 0 - no activity
  "#1a3a2a", // 1 - light
  "#1f5c36", // 2 - moderate
  "#27a24e", // 3 - high
  "#3AE374", // 4 - very high
];

const RevisionHeatmap = ({ data }) => {
  // Group data into weeks
  const weeks = [];
  let currentWeek = [];

  data.forEach((day, i) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay(); // 0 = Sun

    if (i === 0 && dayOfWeek > 0) {
      for (let j = 0; j < dayOfWeek; j++) {
        currentWeek.push(null);
      }
    }

    currentWeek.push(day);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div>
      {/* Day labels */}
      <div style={{ display: "flex", gap: "2px", marginBottom: "4px", paddingLeft: "0px" }}>
        {dayLabels.map((d, i) => (
          <div
            key={i}
            style={{
              width: "14px",
              textAlign: "center",
              fontSize: "9px",
              color: "#444",
              fontFamily: "var(--font-mono)",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid - transposed: columns are days of week, rows are weeks */}
      <div style={{ display: "flex", gap: "2px" }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {week.map((day, di) => (
              <div
                key={di}
                title={day ? `${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}` : ""}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "2px",
                  background: day ? intensityColors[day.count] : "#0D0D0D",
                  cursor: day ? "pointer" : "default",
                  transition: "transform 0.1s",
                }}
                onMouseEnter={(e) => day && (e.currentTarget.style.transform = "scale(1.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
        <span style={{ fontSize: "10px", color: "#444", fontFamily: "var(--font-mono)" }}>Less</span>
        {intensityColors.map((c, i) => (
          <div
            key={i}
            style={{ width: "10px", height: "10px", borderRadius: "2px", background: c }}
          />
        ))}
        <span style={{ fontSize: "10px", color: "#444", fontFamily: "var(--font-mono)" }}>More</span>
      </div>
    </div>
  );
};

export default RevisionHeatmap;
