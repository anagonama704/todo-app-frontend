import { Paper } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const MainFrame = () => {
  return (
    <Paper shadow="xs" radius="sm" p="xl">
      <Outlet />
    </Paper>
  );
};
