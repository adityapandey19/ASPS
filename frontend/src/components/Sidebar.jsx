import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "syllabus",
    label: "Syllabus",
    path: "/syllabus",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    id: "planner",
    label: "Planner",
    path: "/planner",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/analytics",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("asps_token");
    localStorage.removeItem("asps_user");
    onLogout?.();
    navigate("/login");
  };

  const activeLinkStyle = {
    color: "#4F9DFF",
    background: "rgba(79,157,255,0.08)",
    borderLeft: "2px solid #4F9DFF",
  };

  const baseLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 20px",
    color: "#666",
    textDecoration: "none",
    fontSize: "13px",
    fontFamily: "var(--font-body)",
    fontWeight: "500",
    borderLeft: "2px solid transparent",
    transition: "all 0.15s ease",
    letterSpacing: "0.3px",
  };

  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100%",
        background: "#0D0D0D",
        borderRight: "1px solid #1A1A1A",
        display: "flex",
        flexDirection: "column",
        paddingTop: "8px",
      }}
    >
      {/* Nav Items */}
      <nav style={{ flex: 1, paddingTop: "8px" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            style={({ isActive }) =>
              isActive ? { ...baseLinkStyle, ...activeLinkStyle } : baseLinkStyle
            }
          >
            <span style={{ opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1A1A1A", margin: "8px 0" }} />

      {/* System status */}
      <div style={{ padding: "12px 20px" }}>
        <div
          style={{
            background: "#0F1A0F",
            border: "1px solid #1E2E1E",
            borderRadius: "6px",
            padding: "8px 10px",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#3AE374", letterSpacing: "1.5px", marginBottom: "6px" }}>
            SYS STATUS
          </div>
          <div style={{ fontSize: "11px", color: "#666", display: "flex", justifyContent: "space-between" }}>
            <span>API</span>
            <span style={{ color: "#3AE374" }}>● LIVE</span>
          </div>
          <div style={{ fontSize: "11px", color: "#666", display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
            <span>Sync</span>
            <span style={{ color: "#FFA502" }}>● PENDING</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          margin: "0 12px 16px",
          padding: "9px 14px",
          background: "transparent",
          border: "1px solid #2A2A2A",
          borderRadius: "6px",
          color: "#666",
          fontSize: "13px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "all 0.15s ease",
          fontFamily: "var(--font-body)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#FF4757";
          e.currentTarget.style.color = "#FF4757";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#2A2A2A";
          e.currentTarget.style.color = "#666";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
