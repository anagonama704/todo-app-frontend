import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// workerの設定
export const worker = setupWorker(...handlers);

// Service Workerの設定を提供
export const workerConfig = {
  onUnhandledRequest: "bypass" as const,
  quiet: true,
  // Service Workerの設定をシンプルに
  worker: {
    options: {
      scope: "/",
    },
  },
};

// 自動起動の設定を削除（index.tsxで制御するため）
