import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 環境に応じたService Worker URLを設定
const getWorkerUrl = () => {
  if (import.meta.env.DEV) {
    return "/mockServiceWorker.js";
  }
  // Vercel環境の場合
  if (import.meta.env.VITE_USE_MOCK_API === "true") {
    return `https://${import.meta.env.VITE_VERCEL_URL}/mockServiceWorker.js`;
  }
  // デフォルトはオリジンからの相対パス
  return `${window.location.origin}/mockServiceWorker.js`;
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
