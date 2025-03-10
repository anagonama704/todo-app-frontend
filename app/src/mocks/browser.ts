import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// 開発環境でのみMSWを有効化
if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: "bypass", // 未処理のリクエストは通常通り処理
  });
}
