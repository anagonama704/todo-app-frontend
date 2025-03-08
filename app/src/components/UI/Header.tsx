import {
  Group,
  Flex,
  Image,
  Title,
  Avatar,
  Box,
  Menu,
  ActionIcon,
  Indicator,
  useMantineColorScheme,
  Tooltip,
} from "@mantine/core";
import { useAuthStore } from "../../features/auth/store/auth";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconBell,
  IconSun,
  IconMoon,
  IconHelp,
} from "@tabler/icons-react";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box h="100%" px="md">
      <Flex justify="space-between" align="center" h="100%">
        <Group gap="xs">
          <Image w={32} h={32} src="/images/logo.png" />
          <Title order={1} size="h3" c="#59B5F8">
            ToDoApp
          </Title>
        </Group>

        <Group gap="md">
          <Tooltip label="通知">
            <Indicator color="red" size={8} offset={4} disabled={false}>
              <ActionIcon
                variant="subtle"
                color="#59B5F8"
                size="md"
                radius="xl"
              >
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
          </Tooltip>

          <Tooltip label={isDark ? "ライトモード" : "ダークモード"}>
            <ActionIcon
              variant="subtle"
              color="#59B5F8"
              size="md"
              radius="xl"
              onClick={() => toggleColorScheme()}
            >
              {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="ヘルプ">
            <ActionIcon variant="subtle" color="#59B5F8" size="md" radius="xl">
              <IconHelp size={20} />
            </ActionIcon>
          </Tooltip>

          <Box ml="md">
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <Avatar
                  size="md"
                  radius="xl"
                  src={null}
                  color="#59B5F8"
                  style={{ cursor: "pointer" }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>アカウント</Menu.Label>
                <Menu.Item leftSection={<IconUser size={16} />}>
                  プロフィール
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={16} />}>
                  設定
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={16} />}
                  onClick={handleLogout}
                >
                  ログアウト
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Group>
      </Flex>
    </Box>
  );
};
