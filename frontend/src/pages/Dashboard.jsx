import React, { useState, useEffect } from "react";
import StudyPlanCard from "../components/StudyPlanCard";
import ProgressBar from "../components/ProgressBar";
import { mockStudyPlan, mockAnalytics } from "../data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const StatCard = ({ label, value, sub, color = "#4F9DFF", delay = 0 }) => (
  <div
    className={`card fade-in-delay-${delay}`}
    style={{ padding: "20px", flex: 1, minWidth: "140px" }}
  >
    <div style={{ fontSize: "11px", color: "#555", fontFamily: "var(--font-mono)", letterSpacing: "1px", marginBottom: "10px" }}>
      {label}
    </div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "32px", fontWeight: "700", color, lineHeight: 1 }}>
      {value}
    </div>
    {sub && <div style={{ fontSize: "11px", color: "#666", marginTop: "6px" }}>{sub}</div>}
  </div>
);

const Dashboard = () => {
  const [plan] = useState(mockStudyPlan);
  const [analytics] = useState(mockAnalytics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: "12px" }}>
        <div
          style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#4F9DFF", animation: "pulse-glow 1s infinite",
          }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#555", letterSpacing: "2px" }}>
          LOADING...
        </span>
      </div>
    );
  }

  const totalTopics = 22;
  const completed = 8;
  const remaining = totalTopics - completed;

  return (
    <div style={{ padding: "28px", maxWidth: "1200px" }}>
      {/* Header */}
      <div className="fade-in" style={{ marginBottom: "28px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "2px", marginBottom: "4px" }}>
          {plan.date}
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#eee" }}>
          Good morning 👋
        </h1>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
          You have <span style={{ color: "#4F9DFF" }}>{plan.topics.length} topics</span> scheduled today
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
        <StatCard label="COVERAGE" value={`${analytics.coverage.percentage}%`} sub="of syllabus complete" color="#3AE374" delay={1} />
        <StatCard label="COMPLETED" value={completed} sub="topics mastered" color="#4F9DFF" delay={2} />
        <StatCard label="REMAINING" value={remaining} sub="topics pending" color="#FFA502" delay={3} />
        <StatCard label="STUDY STREAK" value="7d" sub="days in a row" color="#9B59B6" delay={1} />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Today's Plan */}
        <div className="card fade-in-delay-1" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "2px" }}>
                TODAY'S PLAN
              </div>
              <div style={{ fontSize: "14px", color: "#ccc" }}>
                {plan.hours}h scheduled · {plan.topics.reduce((a, t) => a + t.duration, 0)} min total
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                padding: "3px 8px",
                background: "rgba(58,227,116,0.1)",
                border: "1px solid rgba(58,227,116,0.2)",
                borderRadius: "3px",
                color: "#3AE374",
              }}
            >
              GENERATED
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {plan.topics.map((t, i) => (
              <StudyPlanCard key={t.id} topic={t} index={i} />
            ))}
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="card fade-in-delay-2" style={{ padding: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "16px" }}>
              PROGRESS OVERVIEW
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <ProgressBar label="Syllabus Coverage" value={analytics.coverage.percentage} color="#3AE374" height={8} />
              <ProgressBar label="Unit 1: Linear DS" value={65} color="#4F9DFF" height={6} />
              <ProgressBar label="Unit 2: Non-Linear DS" value={20} color="#FFA502" height={6} />
              <ProgressBar label="Unit 3: Algorithms" value={45} color="#9B59B6" height={6} />
            </div>
          </div>

          {/* Priority chart */}
          <div className="card fade-in-delay-3" style={{ padding: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "12px" }}>
              PRIORITY DISTRIBUTION
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={analytics.priorityDistribution} barSize={18} margin={{ left: -30 }}>
                <XAxis dataKey="topic" tick={{ fill: "#555", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "6px", fontFamily: "var(--font-mono)", fontSize: "11px" }}
                  itemStyle={{ color: "#4F9DFF" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="priority" radius={[3, 3, 0, 0]}>
                  {analytics.priorityDistribution.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#FF4757" : i === 1 ? "#FFA502" : "#4F9DFF"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card fade-in-delay-2" style={{ padding: "20px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "16px" }}>
          RECENT ACTIVITY
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
          {analytics.recentActivity.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                padding: "10px 14px",
                background: "#0F0F0F",
                borderRadius: "6px",
                border: "1px solid #1A1A1A",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", minWidth: "60px", paddingTop: "1px" }}>
                {a.date}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: "#ccc" }}>{a.action}</div>
                <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{a.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
