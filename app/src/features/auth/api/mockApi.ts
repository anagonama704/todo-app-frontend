import { AuthResponse, LoginCredentials, RegisterCredentials } from "../types";
import { mockUsers, generateToken } from "./mockData";
import { User } from "../../../types/user";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  await delay(500); // APIリクエストをシミュレート

  const user = mockUsers.find((u) => u.email === credentials.email);
  if (!user || user.password !== credentials.password) {
    throw new Error("メールアドレスまたはパスワードが正しくありません");
  }

  const { token, expiresAt } = generateToken(user);
  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword as User,
    token,
    expiresAt,
  };
};

export const mockRegister = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  await delay(500);

  if (mockUsers.some((u) => u.email === credentials.email)) {
    throw new Error("Email already exists");
  }

  const newUser = {
    id: String(mockUsers.length + 1),
    email: credentials.email,
    password: credentials.password,
    name: credentials.name,
  };

  mockUsers.push(newUser);
  const { token, expiresAt } = generateToken(newUser);
  const { password, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword as User, token, expiresAt };
};

export const mockLogout = async (): Promise<void> => {
  await delay(200); // APIリクエストをシミュレート
};

export const mockGetCurrentUser = async (token: string): Promise<User> => {
  await delay(300); // APIリクエストをシミュレート

  const userId = token.replace("jwt-token-", "");
  const user = mockUsers.find((u) => u.id.toString() === userId);

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const mockRequestPasswordReset = async (
  email: string
): Promise<void> => {
  await delay(500);
  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found");
  }
};

export const mockResetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  await delay(500);
  const userId = token.split("-")[3];
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    throw new Error("Invalid token");
  }

  user.password = newPassword;
};
