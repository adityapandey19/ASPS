import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("asps_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("asps_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { token, user }
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("asps_token");
};

export const uploadSyllabus = async (formData) => {
  const res = await api.post("/syllabus/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getSyllabus = async () => {
  const res = await api.get("/syllabus");
  return res.data;
};

export const updateExposure = async (topicId, exposureLevel) => {
  const res = await api.patch(`/syllabus/topics/${topicId}`, {
    exposure: exposureLevel,
  });
  return res.data;
};

export const getStudyPlan = async (availableHours) => {
  const res = await api.post("/planner/generate", { hours: availableHours });
  return res.data;
};

export const getAnalytics = async () => {
  const res = await api.get("/analytics");
  return res.data;
};

export const getDashboard = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};

export default api;
