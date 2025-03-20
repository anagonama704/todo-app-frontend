export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// タグ作成時の型（IDや作成日時などは自動生成されるため除外）
export type CreateTagInput = Omit<Tag, "id" | "createdAt" | "updatedAt">;

// タグ更新時の型（一部のフィールドのみ更新可能）
export type UpdateTagInput = Partial<
  Omit<Tag, "id" | "createdAt" | "updatedAt">
>;
