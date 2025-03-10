import { AppShell as MantineAppShell } from "@mantine/core";
import { Header } from "../../components/UI/Header";
import { Sidebar } from "../../components/UI/Sidebar";
import { MainFrame } from "./components/MainFrame";

export const Home = () => {
  return (
    <MantineAppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Header />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar>
        <Sidebar />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <MainFrame />
      </MantineAppShell.Main>
    </MantineAppShell>
  );
};
