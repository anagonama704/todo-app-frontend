// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    host: "0.0.0.0", // すべてのネットワークインターフェースでリッスン
    port: 5173, // ポート番号
  },
  preview: {
    port: 5173,
  },
});
