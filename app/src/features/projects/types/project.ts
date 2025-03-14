import { Task } from "../../tasks/types/task";

export type ProjectStatus =
  | "planning"
  | "in_progress"
  | "completed"
  | "archived";
export type ProjectPriority = "low" | "medium" | "high";

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  dueDate?: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  ownerId: string;
  members?: string[]; // メンバーのユーザーID
  tags?: string[]; // プロジェクトのタグ
  progress: number; // 0-100の進捗率
}

// プロジェクト作成時の型（IDや作成日時などは自動生成されるため除外）
export type CreateProjectInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt" | "completedAt" | "tasks" | "progress"
>;

// プロジェクト更新時の型（一部のフィールドのみ更新可能）
export type UpdateProjectInput = Partial<
  Omit<Project, "id" | "createdAt" | "updatedAt" | "completedAt" | "tasks">
>;
