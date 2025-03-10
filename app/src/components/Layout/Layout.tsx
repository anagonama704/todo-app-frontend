import { AppShell } from "@mantine/core";
import { Header } from "../UI/Header";
import { Sidebar } from "../UI/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
