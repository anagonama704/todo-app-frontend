import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  assigneeId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  startDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  parentTaskId?: string;
  subtasks: string[];
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// モックデータ
export const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: "ログイン機能の実装",
    description: "ユーザー認証システムの実装。OAuth2.0を使用する。",
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    projectId: "1",
    assigneeId: "user-1",
    createdBy: "user-2",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-15"),
    dueDate: new Date("2024-03-30"),
    startDate: new Date("2024-03-01"),
    estimatedHours: 40,
    actualHours: 20,
    tags: ["認証", "セキュリティ", "フロントエンド"],
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "UI/UXデザインの改善",
    description: "ユーザーインターフェースの改善とユーザビリティテストの実施",
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    projectId: "1",
    assigneeId: "user-3",
    createdBy: "user-2",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
    dueDate: new Date("2024-04-15"),
    tags: ["デザイン", "UX"],
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "パフォーマンス最適化",
    description: "アプリケーションの読み込み時間とレスポンス時間の改善",
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    projectId: "2",
    assigneeId: "user-1",
    createdBy: "user-2",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    dueDate: new Date("2024-04-30"),
    estimatedHours: 30,
    tags: ["パフォーマンス", "最適化"],
    subtasks: [],
  },
];

// プロジェクトIDでタスクをフィルタリングする関数
export const getTasksByProjectId = (projectId: string): Task[] => {
  return mockTasks.filter((task) => task.projectId === projectId);
};

// タスクのステータスでフィルタリングする関数
export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return mockTasks.filter((task) => task.status === status);
};

// 担当者IDでタスクをフィルタリングする関数
export const getTasksByAssignee = (assigneeId: string): Task[] => {
  return mockTasks.filter((task) => task.assigneeId === assigneeId);
};

// タスクを更新する関数
export const updateTask = (updatedTask: Task): Task => {
  const index = mockTasks.findIndex((task) => task.id === updatedTask.id);

  if (index === -1) {
    throw new Error(`Task with id ${updatedTask.id} not found`);
  }

  // 更新日時を現在時刻に設定
  updatedTask.updatedAt = new Date();

  // タスクを更新
  mockTasks[index] = updatedTask;

  return updatedTask;
};

// タスクを作成する関数
export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  projectId: string;
  assigneeId?: string;
  dueDate?: Date | string;
  startDate?: Date | string;
  estimatedHours?: number;
  tags?: string[];
  parentTaskId?: string;
}

export const createTask = (input: CreateTaskInput): Task => {
  const now = new Date();

  // 日付文字列をDate型に変換
  const dueDate = input.dueDate
    ? typeof input.dueDate === "string"
      ? new Date(input.dueDate)
      : input.dueDate
    : undefined;
  const startDate = input.startDate
    ? typeof input.startDate === "string"
      ? new Date(input.startDate)
      : input.startDate
    : undefined;

  const newTask: Task = {
    id: uuidv4(),
    title: input.title,
    description: input.description || "",
    status: input.status || TaskStatus.TODO,
    priority: input.priority || Priority.MEDIUM,
    projectId: input.projectId,
    assigneeId: input.assigneeId || "未割り当て",
    createdBy: "current-user", // 実際の認証システムと連携する場合は現在のユーザーIDを使用
    createdAt: now,
    updatedAt: now,
    dueDate,
    startDate,
    estimatedHours: input.estimatedHours,
    actualHours: 0,
    tags: input.tags || [],
    parentTaskId: input.parentTaskId,
    subtasks: [],
  };

  // モックデータに追加
  mockTasks.push(newTask);

  return newTask;
};
