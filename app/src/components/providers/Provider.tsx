import { MantineProvider, createTheme } from "@mantine/core";
import { ReactNode, useEffect, useMemo } from "react";
import { useAuthStore } from "../../features/auth/store/auth";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useSettingsStore } from "../../features/settings/store/settings";

const Provider = ({ children }: { children: ReactNode }) => {
  const { checkAuth } = useAuthStore();
  const settings = useSettingsStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // テーマの設定をメモ化
  const theme = useMemo(
    () =>
      createTheme({
        fontSizes: {
          sm: "0.875rem",
          md: "1rem",
          lg: "1.125rem",
        },
        spacing: {
          xs: settings.isCompactMode ? "0.5rem" : "0.75rem",
          sm: settings.isCompactMode ? "0.75rem" : "1rem",
          md: settings.isCompactMode ? "1rem" : "1.5rem",
          lg: settings.isCompactMode ? "1.5rem" : "2rem",
          xl: settings.isCompactMode ? "2rem" : "3rem",
        },
        primaryColor: "blue",
        defaultRadius: "md",
        components: {
          Text: {
            defaultProps: {
              size: settings.fontSize,
            },
          },
          Button: {
            defaultProps: {
              size: settings.isCompactMode ? "sm" : "md",
            },
          },
          Card: {
            defaultProps: {
              padding: settings.isCompactMode ? "md" : "lg",
            },
          },
          Container: {
            defaultProps: {
              size: "lg",
            },
          },
        },
      }),
    [settings.isCompactMode, settings.fontSize]
  );

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme={settings.isDarkMode ? "dark" : "light"}
    >
      <Notifications position="bottom-left" zIndex={1000} />
      {children}
    </MantineProvider>
  );
};

export default Provider;
