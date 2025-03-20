import { create } from "zustand";
import { Tag, CreateTagInput, UpdateTagInput } from "../types/tag";

interface TagsState {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  fetchTags: () => Promise<void>;
  createTag: (input: CreateTagInput) => Promise<void>;
  updateTag: (id: string, input: UpdateTagInput) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
}

export const useTagsStore = create<TagsState>((set) => ({
  tags: [],
  isLoading: false,
  error: null,

  fetchTags: async () => {
    set({ isLoading: true, error: null });
    try {
      const mockTags: Tag[] = [
        {
          id: "tag1",
          name: "フロントエンド",
          color: "#FF6B6B",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag2",
          name: "バックエンド",
          color: "#4ECDC4",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag3",
          name: "データベース",
          color: "#45B7D1",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag4",
          name: "セキュリティ",
          color: "#96CEB4",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag5",
          name: "テスト",
          color: "#FFEEAD",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag6",
          name: "ドキュメント",
          color: "#D4A5A5",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag7",
          name: "インフラ",
          color: "#9B59B6",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag8",
          name: "UI/UX",
          color: "#3498DB",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag9",
          name: "パフォーマンス",
          color: "#E67E22",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag10",
          name: "アクセシビリティ",
          color: "#2ECC71",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag11",
          name: "API",
          color: "#E74C3C",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag12",
          name: "認証",
          color: "#F1C40F",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag13",
          name: "デプロイ",
          color: "#1ABC9C",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag14",
          name: "モニタリング",
          color: "#34495E",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag15",
          name: "バックアップ",
          color: "#7F8C8D",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag16",
          name: "コードレビュー",
          color: "#16A085",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
        {
          id: "tag17",
          name: "依存関係",
          color: "#8E44AD",
          createdAt: "2024-03-20T00:00:00Z",
          updatedAt: "2024-03-20T00:00:00Z",
        },
      ];
      set({ tags: mockTags });
    } catch (error) {
      set({ error: "タグの取得に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  createTag: async (input: CreateTagInput) => {
    set({ isLoading: true, error: null });
    try {
      const newTag: Tag = {
        id: Math.random().toString(36).substr(2, 9),
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({ tags: [...state.tags, newTag] }));
    } catch (error) {
      set({ error: "タグの作成に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTag: async (id: string, input: UpdateTagInput) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        tags: state.tags.map((tag) =>
          tag.id === id
            ? {
                ...tag,
                ...input,
                updatedAt: new Date().toISOString(),
              }
            : tag
        ),
      }));
    } catch (error) {
      set({ error: "タグの更新に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTag: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        tags: state.tags.filter((tag) => tag.id !== id),
      }));
    } catch (error) {
      set({ error: "タグの削除に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
