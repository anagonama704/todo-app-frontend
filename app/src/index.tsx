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
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
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
