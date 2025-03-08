import { User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "テストユーザー",
  },
];

export const generateToken = (
  user: User
): { token: string; expiresAt: string } => {
  const token = `jwt-token-${user.id}`;
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(); // 1時間後
  return { token, expiresAt };
};
