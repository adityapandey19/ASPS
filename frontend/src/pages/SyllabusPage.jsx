import React, { useState } from "react";
import TopicCard from "../components/TopicCard";
import { mockSyllabus } from "../data/mockData";

const SyllabusPage = () => {
  const [syllabus, setSyllabus] = useState(mockSyllabus);
  const [uploadMode, setUploadMode] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState({ u1: true, u2: true, u3: true });
  const [search, setSearch] = useState("");

  const handleExposureChange = (topicId, value) => {
    setSyllabus((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));
      for (const unit of updated.units) {
        for (const topic of unit.topics) {
          if (topic.id === topicId) {
            topic.exposure = value;
            return updated;
          }
          if (topic.subtopics) {
            for (const sub of topic.subtopics) {
              if (sub.id === topicId) {
                sub.exposure = value;
                return updated;
              }
            }
          }
        }
      }
      return updated;
    });
    // TODO: api.updateExposure(topicId, value)
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // TODO: call api.uploadSyllabus(formData)
    setTimeout(() => {
      setUploading(false);
      setUploadMode(false);
    }, 1500);
  };

  const toggleUnit = (id) => setExpandedUnits((p) => ({ ...p, [id]: !p[id] }));

  const filterTopics = (topics) => {
    if (!search) return topics;
    return topics.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subtopics?.some((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const totalTopics = syllabus.units.reduce((a, u) => a + u.topics.length, 0);
  const completedTopics = syllabus.units.reduce(
    (a, u) => a + u.topics.filter((t) => t.completed).length,
    0
  );

  return (
    <div style={{ padding: "28px", maxWidth: "900px" }}>
      {/* Header */}
      <div className="fade-in" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "2px", marginBottom: "4px" }}>
            COURSE CONTENT
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#eee" }}>{syllabus.course}</h1>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            {completedTopics}/{totalTopics} topics completed
          </p>
        </div>
        <button
          onClick={() => setUploadMode((u) => !u)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px",
            background: uploadMode ? "rgba(79,157,255,0.15)" : "#141414",
            border: `1px solid ${uploadMode ? "#4F9DFF" : "#222"}`,
            borderRadius: "6px",
            color: uploadMode ? "#4F9DFF" : "#888",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            transition: "all 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Syllabus
        </button>
      </div>

      {/* Upload panel */}
      {uploadMode && (
        <div
          className="card fade-in"
          style={{ padding: "20px", marginBottom: "24px", borderColor: "rgba(79,157,255,0.2)" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4F9DFF", letterSpacing: "1.5px", marginBottom: "16px" }}>
            UPLOAD SYLLABUS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* File upload */}
            <div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Upload PDF or TXT file</div>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "24px",
                  background: "#0D0D0D",
                  border: "2px dashed #222",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4F9DFF")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span style={{ fontSize: "12px", color: "#555" }}>
                  {uploading ? "Processing..." : "Click to choose file"}
                </span>
                <span style={{ fontSize: "10px", color: "#444", fontFamily: "var(--font-mono)" }}>PDF · TXT</span>
                <input type="file" accept=".pdf,.txt" onChange={handleUpload} style={{ display: "none" }} />
              </label>
            </div>

            {/* Paste text */}
            <div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>Or paste syllabus text</div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste your syllabus content here..."
                style={{
                  width: "100%",
                  height: "124px",
                  background: "#0D0D0D",
                  border: "1px solid #222",
                  borderRadius: "6px",
                  padding: "10px 12px",
                  color: "#ccc",
                  fontSize: "12px",
                  resize: "none",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4F9DFF")}
                onBlur={(e) => (e.target.style.borderColor = "#222")}
              />
              <button
                disabled={!pasteText}
                style={{
                  marginTop: "8px",
                  padding: "7px 16px",
                  background: pasteText ? "#4F9DFF" : "#1A1A1A",
                  border: "none",
                  borderRadius: "5px",
                  color: pasteText ? "#fff" : "#444",
                  fontSize: "12px",
                  cursor: pasteText ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-body)",
                }}
              >
                Parse & Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <svg
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#444" }}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            border: "1px solid #1E1E1E",
            borderRadius: "6px",
            padding: "9px 12px 9px 36px",
            color: "#ccc",
            fontSize: "13px",
            outline: "none",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4F9DFF")}
          onBlur={(e) => (e.target.style.borderColor = "#1E1E1E")}
        />
      </div>

      {/* Units */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {syllabus.units.map((unit) => {
          const filtered = filterTopics(unit.topics);
          if (filtered.length === 0 && search) return null;

          return (
            <div key={unit.id} className="fade-in">
              {/* Unit header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => toggleUnit(unit.id)}
              >
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"
                  style={{ transform: expandedUnits[unit.id] ? "rotate(90deg)" : "rotate(0)", transition: "0.2s" }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#4F9DFF", letterSpacing: "1px" }}>
                  {unit.name.toUpperCase()}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#1A1A1A" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555" }}>
                  {unit.topics.filter((t) => t.completed).length}/{unit.topics.length}
                </span>
              </div>

              {/* Topics */}
              {expandedUnits[unit.id] && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "16px" }}>
                  {filtered.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} onExposureChange={handleExposureChange} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SyllabusPage;
