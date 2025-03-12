import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./components/routes/App";
import "@mantine/core/styles.css";

async function initializeMockServiceWorker() {
  if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_API === "true") {
    const { worker } = await import("./mocks/browser");
    console.log(import.meta.env.VITE_USE_MOCK_API);
    console.log(import.meta.env.VITE_API_URL);
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
