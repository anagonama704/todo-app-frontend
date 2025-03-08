import { http, HttpResponse } from "msw";
import {
  mockLogin,
  mockLogout,
  mockGetCurrentUser,
  mockRegister,
  mockRequestPasswordReset,
  mockResetPassword,
} from "../features/auth/api/mockApi";
import {
  LoginCredentials,
  RegisterCredentials,
  PasswordReset,
  PasswordResetRequest,
} from "../features/auth/types";

// モックユーザーデータ
const mockUsers = [
  {
    id: 1,
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  },
];

// モックトークン生成
const generateToken = (user: (typeof mockUsers)[0]) => {
  return `mock-jwt-token-${user.id}`;
};

export const handlers = [
  // ログイン
  http.post<never, LoginCredentials>("/api/auth/login", async ({ request }) => {
    try {
      const credentials = await request.json();
      const response = await mockLogin(credentials);
      return HttpResponse.json(response);
    } catch (error) {
      return new HttpResponse(
        JSON.stringify({
          message: error instanceof Error ? error.message : "認証エラー",
        }),
        { status: 401 }
      );
    }
  }),

  // 新規登録
  http.post<never, RegisterCredentials>(
    "/api/auth/register",
    async ({ request }) => {
      try {
        const credentials = await request.json();
        const response = await mockRegister(credentials);
        return HttpResponse.json(response);
      } catch (error) {
        return new HttpResponse(
          JSON.stringify({
            message: error instanceof Error ? error.message : "登録エラー",
          }),
          { status: 400 }
        );
      }
    }
  ),

  // ログアウト
  http.post("/api/auth/logout", async () => {
    await mockLogout();
    return new HttpResponse(null, { status: 200 });
  }),

  // 現在のユーザー情報取得
  http.get("/api/auth/me", async ({ request }) => {
    try {
      const token = request.headers
        .get("Authorization")
        ?.replace("Bearer ", "");
      if (!token) {
        return new HttpResponse(
          JSON.stringify({ message: "認証トークンが見つかりません" }),
          { status: 401 }
        );
      }
      const user = await mockGetCurrentUser(token);
      return HttpResponse.json(user);
    } catch (error) {
      return new HttpResponse(
        JSON.stringify({
          message: error instanceof Error ? error.message : "認証エラー",
        }),
        { status: 401 }
      );
    }
  }),

  // パスワードリセットリクエスト
  http.post<never, PasswordResetRequest>(
    "/api/auth/password-reset-request",
    async ({ request }) => {
      try {
        const { email } = await request.json();
        await mockRequestPasswordReset(email);
        return new HttpResponse(null, { status: 200 });
      } catch (error) {
        return new HttpResponse(
          JSON.stringify({
            message:
              error instanceof Error ? error.message : "リクエストエラー",
          }),
          { status: 400 }
        );
      }
    }
  ),

  // パスワードリセット
  http.post<never, PasswordReset>(
    "/api/auth/password-reset",
    async ({ request }) => {
      try {
        const { token, newPassword } = await request.json();
        await mockResetPassword(token, newPassword);
        return new HttpResponse(null, { status: 200 });
      } catch (error) {
        return new HttpResponse(
          JSON.stringify({
            message: error instanceof Error ? error.message : "リセットエラー",
          }),
          { status: 400 }
        );
      }
    }
  ),
];
