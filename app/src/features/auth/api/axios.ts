import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // セッションCookieを送信するために必要
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエストインターセプター
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => {
    // トークンがレスポンスに含まれている場合は保存
    const token = response.data?.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
