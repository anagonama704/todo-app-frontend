import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./components/routes/App";
import "@mantine/core/styles.css";

// 全ての環境変数をログ出力
console.log("All env vars:", import.meta.env);
console.log("VITE_USE_MOCK_API:", import.meta.env.VITE_USE_MOCK_API);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("MODE:", import.meta.env.MODE);

async function initializeMockServiceWorker() {
  if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_API === "true") {
    const { worker } = await import("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
  return Promise.resolve();
}

initializeMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
