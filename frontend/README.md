# ASPS Frontend — Adaptive Study Planning System

A production-ready React frontend for ASPS, featuring a dark mission-control aesthetic.

## Stack

- **React 18** + **Vite**
- **React Router v6** — client-side routing
- **Recharts** — analytics charts
- **Axios** — API client
- **TailwindCSS** — utility styling
- Custom CSS variables for the dark theme

## Quick Start

```bash
cd asps-frontend
npm install
npm run dev       # → http://localhost:3000
```

Demo login: use any email + password (falls back to mock auth when API is unreachable).

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Top bar with system status
│   ├── Sidebar.jsx           # Left navigation
│   ├── StudyPlanCard.jsx     # Topic card for planner
│   ├── TopicCard.jsx         # Collapsible topic with subtopics
│   ├── ExposureSelector.jsx  # 0–4 exposure level dropdown
│   ├── ProgressBar.jsx       # Animated progress bar
│   ├── CoverageChart.jsx     # Pie chart — syllabus coverage
│   ├── ExposureChart.jsx     # Bar chart — exposure distribution
│   └── RevisionHeatmap.jsx   # GitHub-style calendar heatmap
│
├── pages/
│   ├── LoginPage.jsx         # Auth page
│   ├── Dashboard.jsx         # Overview + today's plan
│   ├── SyllabusPage.jsx      # Hierarchy view + upload
│   ├── PlannerPage.jsx       # Plan generator
│   ├── AnalyticsPage.jsx     # Full analytics dashboard
│   └── SettingsPage.jsx      # App settings
│
├── services/
│   └── api.js                # Axios client + all API functions
│
├── data/
│   └── mockData.js           # Mock syllabus, plans, analytics
│
└── styles/
    └── theme.css             # CSS variables + global styles
```

## API Integration

All API calls are in `src/services/api.js`. Set `VITE_API_BASE_URL` in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Available functions:
| Function | Method | Endpoint |
|---|---|---|
| `login(email, password)` | POST | `/auth/login` |
| `getSyllabus()` | GET | `/syllabus` |
| `uploadSyllabus(formData)` | POST | `/syllabus/upload` |
| `updateExposure(topicId, level)` | PATCH | `/syllabus/topics/:id` |
| `getStudyPlan(hours)` | POST | `/planner/generate` |
| `getAnalytics()` | GET | `/analytics` |
| `getDashboard()` | GET | `/dashboard` |

## Exposure Levels

| Value | Label |
|---|---|
| 0 | Not Studied |
| 1 | Read |
| 2 | Practiced |
| 3 | Revised |
| 4 | Tested |

## Theme

Dark mission-control palette with CSS variables in `theme.css`:
- `--accent-blue: #4F9DFF`
- `--accent-green: #3AE374`
- `--accent-orange: #FFA502`
- `--font-mono: Space Mono`
- `--font-body: DM Sans`
