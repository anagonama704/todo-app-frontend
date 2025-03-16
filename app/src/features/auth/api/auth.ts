import { LoginCredentials, AuthResponse, RegisterCredentials } from "../types";
import {
  mockLogin,
  mockRegister,
  mockLogout,
  mockGetCurrentUser,
  mockRequestPasswordReset,
  mockResetPassword,
  mockUpdateProfile,
  mockUpdateSettings,
} from "./mockApi";
import { User } from "../../../types/user";
import { api } from "../../../lib/api";

// モックAPIを使用するかどうかの判定
const useMockApi =
  import.meta.env.VITE_USE_MOCK_API === "true" || import.meta.env.DEV;

// APIクライアントの設定
const setupApiClient = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // Axiosのデフォルトヘッダーにトークンを設定
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// 初期設定を実行
setupApiClient();

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  if (useMockApi) {
    const response = await mockLogin(credentials);
    setupApiClient();
    return response;
  }
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  setupApiClient();
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  if (useMockApi) {
    const response = await mockRegister(credentials);
    setupApiClient();
    return response;
  }
  const response = await api.post<AuthResponse>("/auth/register", credentials);
  setupApiClient();
  return response.data;
};

export const logout = async (): Promise<void> => {
  if (useMockApi) {
    await mockLogout();
    // ログアウト時にトークンをクリア
    // axios.defaults.headers.common["Authorization"] = "";
    return;
  }
  await api.post("/auth/logout");
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("認証トークンが見つかりません");
  }
  if (useMockApi) {
    return mockGetCurrentUser(token);
  }
  const response = await api.get<User>("/auth/me");
  return response.data;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  if (useMockApi) {
    return mockRequestPasswordReset(email);
  }
  await api.post("/auth/password-reset-request", { email });
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  if (useMockApi) {
    return mockResetPassword(token, newPassword);
  }
  await api.post("/auth/password-reset", { token, newPassword });
};

export const updateProfile = async (data: {
  name: string;
  displayName: string;
  email: string;
}): Promise<User> => {
  if (useMockApi) {
    return mockUpdateProfile(data);
  }
  const response = await api.put("/auth/profile", data);
  return response.data;
};

// 設定を保存するAPIクライアント
export const apiUpdateSettings = async (settings: {
  theme: string;
  primaryColor: string;
  notifications: boolean;
  language: string;
}) => {
  if (useMockApi) {
    return mockUpdateSettings(settings);
  }
  const response = await api.put("/api/settings", settings);
  return response.data;
};
