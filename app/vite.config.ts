// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // すべてのネットワークインターフェースでリッスン
    port: 5173, // ポート番号
  },
});
