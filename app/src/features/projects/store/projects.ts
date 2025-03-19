import { create } from "zustand";
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "../types/project";

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (input: CreateProjectInput) => Promise<void>;
  updateProject: (id: string, input: UpdateProjectInput) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIからプロジェクトを取得
      const mockProjects: Project[] = [
        {
          id: "1",
          title: "ウェブサイトリニューアル",
          description: "会社のウェブサイトをリニューアルするプロジェクト",
          status: "in_progress",
          priority: "high",
          dueDate: "2024-04-30",
          tasks: [],
          createdAt: "2024-03-15",
          updatedAt: "2024-03-15",
          ownerId: "user1",
          members: ["user1", "user2"],
          tags: ["web", "design"],
          progress: 45,
        },
        {
          id: "2",
          title: "モバイルアプリ開発",
          description: "新規モバイルアプリの開発プロジェクト",
          status: "planning",
          priority: "medium",
          dueDate: "2024-06-30",
          tasks: [],
          createdAt: "2024-03-10",
          updatedAt: "2024-03-10",
          ownerId: "user1",
          members: ["user1", "user3"],
          tags: ["mobile", "development"],
          progress: 0,
        },
        {
          id: "3",
          title: "社内システム改善",
          description: "既存の社内システムのパフォーマンス改善と機能追加",
          status: "in_progress",
          priority: "high",
          dueDate: "2024-05-15",
          tasks: [],
          createdAt: "2024-03-01",
          updatedAt: "2024-03-15",
          ownerId: "user2",
          members: ["user2", "user4", "user5"],
          tags: ["internal", "system", "improvement"],
          progress: 75,
        },
        {
          id: "4",
          title: "新規ECサイト構築",
          description: "新規ECサイトの設計から実装まで",
          status: "planning",
          priority: "high",
          dueDate: "2024-07-31",
          tasks: [],
          createdAt: "2024-03-05",
          updatedAt: "2024-03-05",
          ownerId: "user3",
          members: ["user3", "user1", "user6"],
          tags: ["ecommerce", "web", "development"],
          progress: 0,
        },
        {
          id: "5",
          title: "セキュリティ監査",
          description: "全システムのセキュリティ監査と脆弱性対策",
          status: "in_progress",
          priority: "high",
          dueDate: "2024-04-15",
          tasks: [],
          createdAt: "2024-03-08",
          updatedAt: "2024-03-15",
          ownerId: "user4",
          members: ["user4", "user2", "user7"],
          tags: ["security", "audit"],
          progress: 30,
        },
        {
          id: "6",
          title: "データ分析基盤構築",
          description: "ビッグデータ分析のための基盤システム構築",
          status: "planning",
          priority: "medium",
          dueDate: "2024-08-31",
          tasks: [],
          createdAt: "2024-03-12",
          updatedAt: "2024-03-12",
          ownerId: "user5",
          members: ["user5", "user3", "user8"],
          tags: ["data", "analytics", "infrastructure"],
          progress: 0,
        },
        {
          id: "7",
          title: "社員研修システム開発",
          description: "オンライン学習プラットフォームの開発",
          status: "in_progress",
          priority: "medium",
          dueDate: "2024-06-15",
          tasks: [],
          createdAt: "2024-03-03",
          updatedAt: "2024-03-15",
          ownerId: "user6",
          members: ["user6", "user4", "user9"],
          tags: ["education", "platform", "development"],
          progress: 60,
        },
        {
          id: "8",
          title: "AIチャットボット開発",
          description: "顧客サポート用のAIチャットボット開発",
          status: "planning",
          priority: "high",
          dueDate: "2024-09-30",
          tasks: [],
          createdAt: "2024-03-18",
          updatedAt: "2024-03-18",
          ownerId: "user7",
          members: ["user7", "user5", "user10"],
          tags: ["ai", "chatbot", "customer-support"],
          progress: 0,
        },
        {
          id: "9",
          title: "クラウド移行プロジェクト",
          description: "既存システムのクラウドインフラへの移行",
          status: "in_progress",
          priority: "high",
          dueDate: "2024-07-15",
          tasks: [],
          createdAt: "2024-03-14",
          updatedAt: "2024-03-15",
          ownerId: "user8",
          members: ["user8", "user6", "user11"],
          tags: ["cloud", "infrastructure", "migration"],
          progress: 25,
        },
        {
          id: "10",
          title: "APIゲートウェイ構築",
          description:
            "マイクロサービスアーキテクチャのためのAPIゲートウェイ構築",
          status: "planning",
          priority: "medium",
          dueDate: "2024-08-15",
          tasks: [],
          createdAt: "2024-03-16",
          updatedAt: "2024-03-16",
          ownerId: "user9",
          members: ["user9", "user7", "user12"],
          tags: ["api", "microservices", "gateway"],
          progress: 0,
        },
        {
          id: "11",
          title: "モニタリングシステム導入",
          description: "システム監視とアラート機能の実装",
          status: "in_progress",
          priority: "medium",
          dueDate: "2024-05-31",
          tasks: [],
          createdAt: "2024-03-13",
          updatedAt: "2024-03-15",
          ownerId: "user10",
          members: ["user10", "user8", "user13"],
          tags: ["monitoring", "alerting", "devops"],
          progress: 40,
        },
        {
          id: "12",
          title: "アクセシビリティ改善",
          description: "ウェブアプリケーションのアクセシビリティ対応",
          status: "planning",
          priority: "medium",
          dueDate: "2024-06-30",
          tasks: [],
          createdAt: "2024-03-17",
          updatedAt: "2024-03-17",
          ownerId: "user11",
          members: ["user11", "user9", "user14"],
          tags: ["accessibility", "web", "compliance"],
          progress: 0,
        },
        {
          id: "13",
          title: "CI/CDパイプライン構築",
          description: "自動化されたデプロイメントパイプラインの構築",
          status: "in_progress",
          priority: "high",
          dueDate: "2024-04-30",
          tasks: [],
          createdAt: "2024-03-11",
          updatedAt: "2024-03-15",
          ownerId: "user12",
          members: ["user12", "user10", "user15"],
          tags: ["cicd", "devops", "automation"],
          progress: 55,
        },
        {
          id: "14",
          title: "データバックアップシステム",
          description: "自動バックアップとリストア機能の実装",
          status: "planning",
          priority: "high",
          dueDate: "2024-07-31",
          tasks: [],
          createdAt: "2024-03-19",
          updatedAt: "2024-03-19",
          ownerId: "user13",
          members: ["user13", "user11", "user16"],
          tags: ["backup", "data", "security"],
          progress: 0,
        },
        {
          id: "15",
          title: "パフォーマンス最適化",
          description: "アプリケーションのパフォーマンス改善と最適化",
          status: "in_progress",
          priority: "medium",
          dueDate: "2024-06-15",
          tasks: [],
          createdAt: "2024-03-20",
          updatedAt: "2024-03-20",
          ownerId: "user14",
          members: ["user14", "user12", "user17"],
          tags: ["performance", "optimization", "web"],
          progress: 20,
        },
      ];
      set({ projects: mockProjects });
    } catch (error) {
      set({ error: "プロジェクトの取得に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (input: CreateProjectInput) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIでプロジェクトを作成
      const newProject: Project = {
        ...input,
        id: Math.random().toString(36).substr(2, 9),
        tasks: [],
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        projects: [...state.projects, newProject],
      }));
    } catch (error) {
      set({ error: "プロジェクトの作成に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id: string, input: UpdateProjectInput) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIでプロジェクトを更新
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id
            ? {
                ...project,
                ...input,
                updatedAt: new Date().toISOString(),
              }
            : project
        ),
      }));
    } catch (error) {
      set({ error: "プロジェクトの更新に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: APIでプロジェクトを削除
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
      }));
    } catch (error) {
      set({ error: "プロジェクトの削除に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
