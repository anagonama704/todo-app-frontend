import { MantineProvider } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../../features/auth/store/auth";

const Provider = ({ children }: { children: ReactNode }) => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <MantineProvider>{children}</MantineProvider>;
};

export default Provider;
