import { MantineProvider } from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../../features/auth/store/auth";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

const Provider = ({ children }: { children: ReactNode }) => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <MantineProvider>
      <Notifications position="bottom-left" zIndex={1000} />
      {children}
    </MantineProvider>
  );
};

export default Provider;
