export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  projectId: string;
  assigneeId: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  progress: number; // 0-100の進捗率
}

// タスク作成時の型（IDや作成日時などは自動生成されるため除外）
export type CreateTaskInput = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "completedAt" | "progress"
>;

// タスク更新時の型（一部のフィールドのみ更新可能）
export type UpdateTaskInput = Partial<
  Omit<Task, "id" | "createdAt" | "updatedAt" | "completedAt">
>;
