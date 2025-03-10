import axios from "axios";

// APIのベースURLを設定
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// axiosインスタンスの作成
export const api = axios.create({
  baseURL,
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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラーの場合、ローカルストレージをクリアしてログインページにリダイレクト
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiresAt");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
