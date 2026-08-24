import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Application {
  id: string;
  company: string;
  position: string;
  jobUrl?: string;
  description?: string;
  status: "APPLIED" | "PHONE_SCREEN" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
  appliedDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  total: number;
  applied: number;
  phoneScreen: number;
  interview: number;
  offer: number;
  rejected: number;
  withdrawn: number;
  responseRate: number;
  successRate: number;
}

// Auth APIs
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    api.post<{ user: User; token: string }>("/auth/register", { email, password, name }),
  login: (email: string, password: string) =>
    api.post<{ user: User; token: string }>("/auth/login", { email, password }),
};

// Applications APIs
export const applicationsAPI = {
  getAll: (status?: string, company?: string, search?: string) =>
    api.get<Application[]>("/applications", {
      params: { status, company, search },
    }),
  getById: (id: string) =>
    api.get<Application>(`/applications/${id}`),
  create: (data: Partial<Application>) =>
    api.post<Application>("/applications", data),
  update: (id: string, data: Partial<Application>) =>
    api.put<Application>(`/applications/${id}`, data),
  delete: (id: string) =>
    api.delete(`/applications/${id}`),
};

// Analytics APIs
export const analyticsAPI = {
  getStats: () => api.get<Stats>("/analytics/stats"),
  getMonthlyTimeline: () =>
    api.get<{ month: string; count: number }[]>("/analytics/timeline/monthly"),
  getStatusDistribution: () =>
    api.get<{ [key: string]: number }>("/analytics/distribution/status"),
};

export default api;
