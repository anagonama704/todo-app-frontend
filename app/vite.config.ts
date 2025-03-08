// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  server: {
    host: "0.0.0.0", // すべてのネットワークインターフェースでリッスン
    port: 5173, // ポート番号
  },
  preview: {
    port: 5173,
  },
});
