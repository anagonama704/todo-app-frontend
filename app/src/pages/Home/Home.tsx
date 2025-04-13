import { useState } from "react";
import {
  AppShell as MantineAppShell,
  Burger,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Header } from "../../components/UI/Header";
import { Sidebar } from "../../components/UI/Sidebar";
import { MainFrame } from "./components/MainFrame";

export const Home = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [opened, setOpened] = useState(false);

  return (
    <MantineAppShell
      header={{ height: 56 }}
      navbar={{
        width: { base: 250 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header pr="md" pl="md">
        <Flex justify="space-between" align="center" w="100%">
          {isMobile && (
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
            />
          )}
          <Header />
        </Flex>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar>
        <Sidebar onNavigate={() => isMobile && setOpened(false)} />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <MainFrame />
      </MantineAppShell.Main>
    </MantineAppShell>
  );
};
