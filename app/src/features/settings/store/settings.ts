import { create } from "zustand";

interface SettingsState {
  // 表示設定
  isDarkMode: boolean;
  isCompactMode: boolean;
  fontSize: "sm" | "md" | "lg";

  // 通知設定
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  notifyBeforeDeadline: boolean;
  deadlineNotificationTime: number;

  // タスク設定
  defaultPriority: "low" | "medium" | "high";
  showCompletedTasks: boolean;

  // アクション
  updateSettings: (newSettings: Partial<SettingsState>) => void;
}

// ローカルストレージから設定を読み込む
const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem("todo-settings");
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error("設定の読み込みに失敗しました:", error);
  }
  return null;
};

// 保存された設定またはデフォルト値を使用
const savedSettings = loadSettings();
const defaultSettings: Omit<SettingsState, "updateSettings"> = {
  isDarkMode: false,
  isCompactMode: true,
  fontSize: "md",
  enableEmailNotifications: true,
  enablePushNotifications: true,
  notifyBeforeDeadline: true,
  deadlineNotificationTime: 24,
  defaultPriority: "medium",
  showCompletedTasks: true,
};

export const useSettingsStore = create<SettingsState>((set) => ({
  // 初期値として保存された設定またはデフォルト値を使用
  ...defaultSettings,
  ...(savedSettings || {}),

  // 設定を更新して保存
  updateSettings: (newSettings) =>
    set((state) => {
      const updatedState = { ...state, ...newSettings };
      localStorage.setItem("todo-settings", JSON.stringify(updatedState));
      return updatedState;
    }),
}));
