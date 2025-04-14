export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateCommentInput = Omit<
  Comment,
  "id" | "createdAt" | "updatedAt"
>;
