import { create } from "zustand";
import { Comment, CreateCommentInput } from "../types/comment";

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  fetchComments: (taskId: string) => Promise<void>;
  createComment: (input: CreateCommentInput) => Promise<Comment>;
  updateComment: (id: string, content: string) => Promise<Comment>;
  deleteComment: (id: string) => Promise<void>;
}

// モックデータ
const mockComments: Comment[] = [
  {
    id: "1",
    taskId: "1-task-1",
    userId: "user1",
    content:
      "デザインコンペの実施について、以下の点を確認させてください。\n1. 参加者の選定基準\n2. 審査期間\n3. 報酬の詳細",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    taskId: "1-task-1",
    userId: "user2",
    content:
      "参加者の選定基準について、以下の条件を提案します。\n- 実務経験3年以上\n- ポートフォリオの提出\n- 過去の受賞歴",
    createdAt: "2024-03-15T11:30:00Z",
    updatedAt: "2024-03-15T11:30:00Z",
  },
  {
    id: "3",
    taskId: "1-task-1",
    userId: "user1",
    content: "了解しました。審査期間は2週間でいかがでしょうか？",
    createdAt: "2024-03-15T14:15:00Z",
    updatedAt: "2024-03-15T14:15:00Z",
  },
];

export const useCommentsStore = create<CommentsState>((set) => ({
  comments: [],
  isLoading: false,
  error: null,

  fetchComments: async (taskId) => {
    set({ isLoading: true });
    try {
      // TODO: APIを呼び出す
      const taskComments = mockComments.filter(
        (comment) => comment.taskId === taskId
      );
      set({ comments: taskComments, error: null });
    } catch (error) {
      set({ error: "コメントの取得に失敗しました" });
    } finally {
      set({ isLoading: false });
    }
  },

  createComment: async (input) => {
    set({ isLoading: true });
    try {
      // TODO: APIを呼び出す
      const newComment: Comment = {
        ...input,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        comments: [...state.comments, newComment],
        error: null,
      }));
      return newComment;
    } catch (error) {
      set({ error: "コメントの作成に失敗しました" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateComment: async (id, content) => {
    set({ isLoading: true });
    try {
      // TODO: APIを呼び出す
      let updatedComment: Comment | undefined;
      set((state) => {
        const newComments = state.comments.map((comment) =>
          comment.id === id
            ? { ...comment, content, updatedAt: new Date().toISOString() }
            : comment
        );
        updatedComment = newComments.find((comment) => comment.id === id);
        return { comments: newComments, error: null };
      });
      if (!updatedComment) {
        throw new Error("コメントが見つかりません");
      }
      return updatedComment;
    } catch (error) {
      set({ error: "コメントの更新に失敗しました" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteComment: async (id) => {
    set({ isLoading: true });
    try {
      // TODO: APIを呼び出す
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: "コメントの削除に失敗しました" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
