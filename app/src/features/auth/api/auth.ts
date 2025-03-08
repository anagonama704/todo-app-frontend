import { LoginCredentials, AuthResponse, RegisterCredentials } from "../types";
import {
  mockLogin,
  mockRegister,
  mockLogout,
  mockGetCurrentUser,
  mockRequestPasswordReset,
  mockResetPassword,
} from "./mockApi";
import { User } from "../../../types/user";

// 開発環境ではモックAPIを使用
const isDevelopment = import.meta.env.DEV;

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
  if (isDevelopment) {
    const response = await mockLogin(credentials);
    setupApiClient(); // ログイン成功後にトークンを設定
    return response;
  }
  throw new Error("Not implemented");
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  if (isDevelopment) {
    const response = await mockRegister(credentials);
    setupApiClient(); // 登録成功後にトークンを設定
    return response;
  }
  throw new Error("Not implemented");
};

export const logout = async (): Promise<void> => {
  if (isDevelopment) {
    await mockLogout();
    // ログアウト時にトークンをクリア
    // axios.defaults.headers.common["Authorization"] = "";
    return;
  }
  throw new Error("Not implemented");
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("認証トークンが見つかりません");
  }
  return mockGetCurrentUser(token);
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  if (isDevelopment) {
    return mockRequestPasswordReset(email);
  }
  throw new Error("Not implemented");
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  if (isDevelopment) {
    return mockResetPassword(token, newPassword);
  }
  throw new Error("Not implemented");
};
