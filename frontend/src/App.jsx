import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SyllabusPage from "./pages/SyllabusPage";
import PlannerPage from "./pages/PlannerPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/theme.css";

const ProtectedLayout = ({ user, onLogout }) => (
  <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
    <div className="scanline-overlay" />
    <Navbar user={user} />
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <Sidebar onLogout={onLogout} />
      <main style={{ flex: 1, overflowY: "auto", background: "#0B0B0B" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("asps_user");
    const token = localStorage.getItem("asps_token");
    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {}
    }
    setLoading(false);
  }, []);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  if (loading) {
    return (
      <div style={{ height: "100vh", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#4F9DFF", letterSpacing: "3px" }}>
          INITIALIZING...
        </span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/*"
          element={
            user ? (
              <ProtectedLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
