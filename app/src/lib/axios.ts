import axios from "axios";

const API_URL = "http://localhost:3000/api"; // バックエンドのURLに合わせて変更してください

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // セッションCookieを送信するために必要
  headers: {
    "Content-Type": "application/json",
  },
});

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 認証エラー時の処理
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
