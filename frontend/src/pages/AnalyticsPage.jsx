import React, { useState, useEffect } from "react";
import CoverageChart from "../components/CoverageChart";
import ExposureChart from "../components/ExposureChart";
import RevisionHeatmap from "../components/RevisionHeatmap";
import { mockAnalytics } from "../data/mockData";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: api.getAnalytics().then(setData)
    setTimeout(() => {
      setData(mockAnalytics);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: "12px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4F9DFF", animation: "pulse-glow 1s infinite" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#555", letterSpacing: "2px" }}>LOADING ANALYTICS...</span>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "6px", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "#eee" }}>
          <div style={{ color: "#555", marginBottom: "4px" }}>{label}</div>
          <div style={{ color: "#4F9DFF" }}>{payload[0].value} session{payload[0].value !== 1 ? "s" : ""}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: "28px", maxWidth: "1100px" }}>
      {/* Header */}
      <div className="fade-in" style={{ marginBottom: "28px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "2px", marginBottom: "4px" }}>
          PERFORMANCE ANALYTICS
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#eee" }}>Study Analytics</h1>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
          Track your learning patterns and progress over time.
        </p>
      </div>

      {/* Top row: Coverage + Exposure */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "20px", marginBottom: "20px" }}>
        {/* Coverage chart */}
        <div className="card fade-in-delay-1" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "4px" }}>
            SYLLABUS COVERAGE
          </div>
          <div style={{ fontSize: "11px", color: "#555", marginBottom: "12px" }}>
            {data.coverage.completed} of {data.coverage.total} topics
          </div>
          <CoverageChart data={data.coverage} />
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "8px" }}>
            {[{ label: "Completed", color: "#3AE374" }, { label: "Remaining", color: "#222" }].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: l.color }} />
                <span style={{ fontSize: "11px", color: "#666" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exposure distribution */}
        <div className="card fade-in-delay-2" style={{ padding: "20px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "4px" }}>
            EXPOSURE LEVEL DISTRIBUTION
          </div>
          <div style={{ fontSize: "11px", color: "#555", marginBottom: "12px" }}>
            Topics per exposure level
          </div>
          <ExposureChart data={data.exposureDistribution} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
            {data.exposureDistribution.map((d) => (
              <div key={d.level} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: d.color }} />
                <span style={{ fontSize: "10px", color: "#666" }}>{d.level}: {d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revision frequency */}
      <div className="card fade-in-delay-2" style={{ padding: "20px", marginBottom: "20px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "4px" }}>
          REVISION FREQUENCY
        </div>
        <div style={{ fontSize: "11px", color: "#555", marginBottom: "16px" }}>Study sessions over time</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data.revisionHistory} margin={{ left: -20, right: 10 }}>
            <CartesianGrid stroke="#1A1A1A" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#555", fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#555", fontSize: 10, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#4F9DFF"
              strokeWidth={2}
              dot={{ fill: "#4F9DFF", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#4F9DFF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap */}
      <div className="card fade-in-delay-3" style={{ padding: "20px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "4px" }}>
          REVISION HEATMAP
        </div>
        <div style={{ fontSize: "11px", color: "#555", marginBottom: "16px" }}>
          Daily study activity — last 90 days
        </div>
        <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
          <RevisionHeatmap data={data.heatmapData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
