import { MantineProvider } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth";

const Provider = ({ children }: { children: ReactNode }) => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <MantineProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </MantineProvider>
  );
};

export default Provider;
