import { create } from "zustand";
import { Task, CreateTaskInput, UpdateTaskInput } from "../types/task";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<Task>;
  updateTask: (id: string, input: UpdateTaskInput) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
}

// モックデータ
const mockTasks: Task[] = [
  {
    id: "1",
    title: "要件定義書の作成",
    description: "プロジェクトの要件定義書を作成する",
    status: "in_progress",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "1",
    tags: ["1", "2"],
    progress: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "デザインレビュー",
    description: "UIデザインのレビューを行う",
    status: "planning",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "2",
    tags: ["2", "3"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "APIエンドポイントの設計",
    description: "RESTful APIのエンドポイント設計とドキュメント作成",
    status: "in_progress",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "1",
    tags: ["1", "4"],
    progress: 60,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "データベース設計",
    description: "データベーススキーマの設計とER図の作成",
    status: "completed",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "3",
    tags: ["4", "5"],
    progress: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "セキュリティ監査",
    description: "アプリケーションのセキュリティ脆弱性診断",
    status: "planning",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "2",
    tags: ["2", "6"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "パフォーマンステスト",
    description: "負荷テストと性能最適化",
    status: "in_progress",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "1",
    tags: ["3", "4"],
    progress: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "ユーザーマニュアルの作成",
    description: "エンドユーザー向けドキュメントの作成",
    status: "planning",
    priority: "low",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "3",
    tags: ["7"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "CI/CDパイプラインの構築",
    description: "自動デプロイメントパイプラインの設定",
    status: "in_progress",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "1",
    tags: ["4", "8"],
    progress: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "コードレビュー",
    description: "プルリクエストのレビューと品質チェック",
    status: "in_progress",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "2",
    tags: ["1", "8"],
    progress: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    title: "モバイル対応",
    description: "レスポンシブデザインの実装とテスト",
    status: "planning",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "3",
    tags: ["2", "3"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "11",
    title: "バグ修正",
    description: "報告された重要度の高いバグの修正",
    status: "in_progress",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "1",
    tags: ["1", "9"],
    progress: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "12",
    title: "アクセシビリティ対応",
    description: "WAI-ARIAガイドラインに沿った実装",
    status: "planning",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "2",
    tags: ["2", "7"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "13",
    title: "ログ収集システムの構築",
    description: "アプリケーションログの収集と分析基盤の構築",
    status: "in_progress",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "3",
    tags: ["4", "8"],
    progress: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "14",
    title: "テスト自動化",
    description: "E2Eテストの自動化スクリプトの作成",
    status: "planning",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "1",
    tags: ["1", "8"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "15",
    title: "パフォーマンス最適化",
    description: "アプリケーションの応答速度改善",
    status: "in_progress",
    priority: "high",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "2",
    tags: ["3", "4"],
    progress: 65,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "16",
    title: "多言語対応",
    description: "i18n対応の実装",
    status: "planning",
    priority: "low",
    dueDate: new Date().toISOString(),
    projectId: "1",
    assigneeId: "3",
    tags: ["2", "7"],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "17",
    title: "ドキュメントの更新",
    description: "API仕様書とシステム設計書の更新",
    status: "in_progress",
    priority: "medium",
    dueDate: new Date().toISOString(),
    projectId: "2",
    assigneeId: "1",
    tags: ["7", "8"],
    progress: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIからタスクを取得する
      // モックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ tasks: mockTasks });
    } catch (error) {
      set({ error: "タスクの取得に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  createTask: async (input: CreateTaskInput) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIでタスクを作成する
      // モックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newTask: Task = {
        id: Math.random().toString(),
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      return newTask;
    } catch (error) {
      set({ error: "タスクの作成に失敗しました" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateTask: async (id: string, input: UpdateTaskInput) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIでタスクを更新する
      // モックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updatedTask: Task = {
        ...mockTasks.find((task) => task.id === id)!,
        ...input,
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
      return updatedTask;
    } catch (error) {
      set({ error: "タスクの更新に失敗しました" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIでタスクを削除する
      // モックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      set({ error: "タスクの削除に失敗しました" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
