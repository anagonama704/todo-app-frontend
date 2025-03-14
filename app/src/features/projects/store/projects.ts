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

export const useProjectsStore = create<ProjectsState>((set, get) => ({
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
