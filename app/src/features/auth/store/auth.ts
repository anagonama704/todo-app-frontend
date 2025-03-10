import { create } from "zustand";
import { User } from "../../../types/user";
import { RegisterCredentials } from "../types";
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
  register as apiRegister,
  requestPasswordReset as apiRequestPasswordReset,
  resetPassword as apiResetPassword,
  updateProfile as apiUpdateProfile,
  apiUpdateSettings,
} from "../api/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  tokenExpiresAt: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (data: {
    name: string;
    displayName: string;
    email: string;
  }) => Promise<void>;
  updateSettings: (settings: {
    theme: string;
    primaryColor: string;
    notifications: boolean;
    language: string;
  }) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  token: localStorage.getItem("token"),
  tokenExpiresAt: localStorage.getItem("tokenExpiresAt"),

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiLogin({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("tokenExpiresAt", response.expiresAt);
      set({
        user: response.user,
        token: response.token,
        tokenExpiresAt: response.expiresAt,
        isLoading: false,
      });
      await get().checkAuth();
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "ログインに失敗しました",
        isLoading: false,
      });
      return false;
    }
  },

  register: async (credentials: RegisterCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiRegister(credentials);
      if (!response.token) {
        throw new Error("トークンが見つかりません");
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("tokenExpiresAt", response.expiresAt);
      set({
        user: response.user,
        token: response.token,
        tokenExpiresAt: response.expiresAt,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "新規登録に失敗しました", isLoading: false });
      throw error;
    }
  },

  updateProfile: async (data: {
    name: string;
    displayName: string;
    email: string;
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiUpdateProfile(data);
      set({
        user: response,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "プロフィールの更新に失敗しました", isLoading: false });
      throw error;
    }
  },

  updateSettings: async (settings: {
    theme: string;
    primaryColor: string;
    notifications: boolean;
    language: string;
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiUpdateSettings(settings);
      const currentUser = get().user;
      if (!currentUser) throw new Error("ユーザーが見つかりません");

      set({
        user: {
          ...currentUser,
          settings: response,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error: "設定の保存に失敗しました", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiresAt");
      set({ user: null, token: null, tokenExpiresAt: null, isLoading: false });
    }
  },

  checkAuth: async () => {
    const { token, tokenExpiresAt } = get();
    if (!token || !tokenExpiresAt) {
      set({ user: null });
      return;
    }

    // トークンの有効期限をチェック
    if (new Date(tokenExpiresAt) <= new Date()) {
      console.log("Token expired");
      await get().logout();
      return;
    }

    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      set({ user, isLoading: false });
    } catch (error) {
      console.error("Failed to get current user:", error);
      await get().logout();
    }
  },

  requestPasswordReset: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequestPasswordReset(email);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: "パスワードリセットリクエストに失敗しました",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiResetPassword(token, newPassword);
      set({ isLoading: false });
    } catch (error) {
      set({ error: "パスワードのリセットに失敗しました", isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
