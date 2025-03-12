import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./components/routes/App";
import reportWebVitals from "./reportWebVitals";
import "@mantine/core/styles.css";
import Provider from "./components/providers/Provider";

// 全ての環境変数をログ出力
console.log("All env vars:", import.meta.env);
console.log("VITE_USE_MOCK_API:", import.meta.env.VITE_USE_MOCK_API);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("MODE:", import.meta.env.MODE);

async function initApp() {
  // DEV環境またはVITE_USE_MOCK_APIがtrueの場合にモックAPIを有効化
  if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_API === "true") {
    console.log("Initializing mock API...");
    try {
      // Service Workerのサポートチェック
      if (!("serviceWorker" in navigator)) {
        throw new Error("Service Worker is not supported in this browser");
      }

      const { worker, workerConfig } = await import("./mocks/browser");
      console.log("MSW Config:", workerConfig);

      // 既存のService Workerを登録解除
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map((registration) => registration.unregister())
      );

      // MSWを直接起動
      try {
        await worker.start(workerConfig);
        console.log("Mock API initialized successfully");

        // Service Workerの登録状態を確認
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker registration:", registration);
      } catch (error) {
        console.error("MSW initialization failed:", error);
        // エラーの詳細をログ出力
        if (error instanceof Error) {
          console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
          });
        }
      }
    } catch (error) {
      console.error("Failed to import mock API:", error);
    }
  }

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Provider>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

initApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
