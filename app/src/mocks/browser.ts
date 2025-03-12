import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 環境に応じたService Worker URLを設定
const getWorkerUrl = () => {
  // 常に現在のオリジンからの相対パスを使用
  return "/mockServiceWorker.js";
};

// workerの設定
export const worker = setupWorker(...handlers);

// Service Workerの設定を提供
export const workerConfig = {
  onUnhandledRequest: "bypass" as const,
  quiet: true,
  serviceWorker: {
    url: getWorkerUrl(),
  },
};

// 自動起動の設定を削除（index.tsxで制御するため）
