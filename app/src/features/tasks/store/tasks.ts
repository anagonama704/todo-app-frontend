import { create } from "zustand";
import {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskStatus,
  TaskPriority,
} from "../types/task";

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
  // プロジェクト1（ウェブサイトリニューアル）のタスク
  {
    id: "1-task-1",
    title: "デザインコンペの実施",
    description:
      "新しいウェブサイトのデザインコンペを実施し、最適なデザインを選定する",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-04-15",
    projectId: "1",
    assigneeId: "user1",
    tags: ["design", "competition"],
    progress: 60,
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20",
  },
  {
    id: "1-task-2",
    title: "コンテンツの整理",
    description:
      "既存のウェブサイトのコンテンツを整理し、新しい構造に合わせて再構成する",
    status: "planning",
    priority: "medium",
    dueDate: "2024-04-20",
    projectId: "1",
    assigneeId: "user2",
    tags: ["content", "organization"],
    progress: 0,
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  // プロジェクト2（モバイルアプリ開発）のタスク
  {
    id: "2-task-1",
    title: "アプリケーション設計",
    description: "モバイルアプリの基本設計とUI/UXの設計を行う",
    status: "planning",
    priority: "high",
    dueDate: "2024-04-30",
    projectId: "2",
    assigneeId: "user1",
    tags: ["design", "mobile"],
    progress: 0,
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10",
  },
  // プロジェクト3（社内システム改善）のタスク
  {
    id: "3-task-1",
    title: "データベース最適化",
    description:
      "既存のデータベースのクエリを最適化し、パフォーマンスを改善する",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-04-15",
    projectId: "3",
    assigneeId: "user2",
    tags: ["database", "optimization"],
    progress: 60,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15",
  },
  // プロジェクト4（新規ECサイト構築）のタスク
  {
    id: "4-task-1",
    title: "要件定義",
    description: "ECサイトの要件を定義し、設計書を作成する",
    status: "planning",
    priority: "high",
    dueDate: "2024-04-15",
    projectId: "4",
    assigneeId: "user3",
    tags: ["requirements", "design"],
    progress: 0,
    createdAt: "2024-03-05",
    updatedAt: "2024-03-05",
  },
  // プロジェクト5（セキュリティ監査）のタスク
  {
    id: "5-task-1",
    title: "脆弱性スキャン",
    description: "全システムの脆弱性スキャンを実施する",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-03-30",
    projectId: "5",
    assigneeId: "user4",
    tags: ["security", "scan"],
    progress: 40,
    createdAt: "2024-03-08",
    updatedAt: "2024-03-15",
  },
  // プロジェクト6（データ分析基盤構築）のタスク
  {
    id: "6-task-1",
    title: "データ収集基盤の構築",
    description: "ビッグデータ収集のための基盤システムを構築する",
    status: "planning",
    priority: "medium",
    dueDate: "2024-05-15",
    projectId: "6",
    assigneeId: "user5",
    tags: ["data", "infrastructure"],
    progress: 0,
    createdAt: "2024-03-12",
    updatedAt: "2024-03-12",
  },
  // プロジェクト7（社員研修システム開発）のタスク
  {
    id: "7-task-1",
    title: "学習コンテンツの作成",
    description: "オンライン学習用のコンテンツを作成する",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-04-30",
    projectId: "7",
    assigneeId: "user6",
    tags: ["education", "content"],
    progress: 30,
    createdAt: "2024-03-03",
    updatedAt: "2024-03-15",
  },
  // プロジェクト8（AIチャットボット開発）のタスク
  {
    id: "8-task-1",
    title: "AIモデルの選定",
    description: "チャットボットに使用するAIモデルを選定する",
    status: "planning",
    priority: "high",
    dueDate: "2024-05-15",
    projectId: "8",
    assigneeId: "user7",
    tags: ["ai", "model"],
    progress: 0,
    createdAt: "2024-03-18",
    updatedAt: "2024-03-18",
  },
  // プロジェクト9（クラウド移行プロジェクト）のタスク
  {
    id: "9-task-1",
    title: "クラウド環境の構築",
    description: "移行先のクラウド環境を構築する",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-04-30",
    projectId: "9",
    assigneeId: "user8",
    tags: ["cloud", "infrastructure"],
    progress: 25,
    createdAt: "2024-03-14",
    updatedAt: "2024-03-15",
  },
  // プロジェクト10（APIゲートウェイ構築）のタスク
  {
    id: "10-task-1",
    title: "APIゲートウェイの設計",
    description: "マイクロサービス用のAPIゲートウェイを設計する",
    status: "planning",
    priority: "medium",
    dueDate: "2024-05-15",
    projectId: "10",
    assigneeId: "user9",
    tags: ["api", "gateway"],
    progress: 0,
    createdAt: "2024-03-16",
    updatedAt: "2024-03-16",
  },
  // プロジェクト11（モニタリングシステム導入）のタスク
  {
    id: "11-task-1",
    title: "モニタリングツールの選定",
    description: "システム監視に使用するツールを選定する",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-04-15",
    projectId: "11",
    assigneeId: "user10",
    tags: ["monitoring", "tools"],
    progress: 40,
    createdAt: "2024-03-13",
    updatedAt: "2024-03-15",
  },
  // プロジェクト12（アクセシビリティ改善）のタスク
  {
    id: "12-task-1",
    title: "アクセシビリティ診断",
    description: "現在のウェブアプリケーションのアクセシビリティを診断する",
    status: "planning",
    priority: "medium",
    dueDate: "2024-04-30",
    projectId: "12",
    assigneeId: "user11",
    tags: ["accessibility", "audit"],
    progress: 0,
    createdAt: "2024-03-17",
    updatedAt: "2024-03-17",
  },
  // プロジェクト13（CI/CDパイプライン構築）のタスク
  {
    id: "13-task-1",
    title: "CI/CDツールの選定",
    description: "CI/CDパイプライン構築に使用するツールを選定する",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-04-15",
    projectId: "13",
    assigneeId: "user12",
    tags: ["cicd", "tools"],
    progress: 55,
    createdAt: "2024-03-11",
    updatedAt: "2024-03-15",
  },
  // プロジェクト14（データバックアップシステム）のタスク
  {
    id: "14-task-1",
    title: "バックアップ戦略の策定",
    description: "データバックアップの戦略を策定する",
    status: "planning",
    priority: "high",
    dueDate: "2024-05-15",
    projectId: "14",
    assigneeId: "user13",
    tags: ["backup", "strategy"],
    progress: 0,
    createdAt: "2024-03-19",
    updatedAt: "2024-03-19",
  },
  // プロジェクト15（パフォーマンス最適化）のタスク
  {
    id: "15-task-1",
    title: "パフォーマンス計測",
    description: "現在のアプリケーションのパフォーマンスを計測する",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-04-15",
    projectId: "15",
    assigneeId: "user14",
    tags: ["performance", "measurement"],
    progress: 20,
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
  },
];

export type { TaskStatus, TaskPriority };
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
