import { useState } from "react";
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
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "./NotificationModal";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const navigate = useNavigate();
  const isDark = colorScheme === "dark";
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setColorScheme("light");
    navigate("/login");
  };

  return (
    <Box
      component="header"
      w="100%"
      py="xs"
      px={isMobile ? "xs" : "xl"}
      ta="center"
    >
      <NotificationModal
        opened={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />

      <Flex justify="space-between" align="center" h="100%">
        <Group gap="xs">
          <Image w={32} h={32} src="/images/logo.png" />
          <Title order={1} size="h3" c="#59B5F8">
            ToDoApp
          </Title>
        </Group>

        <Group gap="md">
          {!isMobile && (
            <>
              <Tooltip label="通知">
                <Indicator color="red" size={8} offset={4} disabled={false}>
                  <ActionIcon
                    variant="subtle"
                    color="#59B5F8"
                    size="md"
                    radius="xl"
                    onClick={() => setIsNotificationModalOpen(true)}
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
                  onClick={() => setColorScheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
                </ActionIcon>
              </Tooltip>

              <Tooltip label="ヘルプ">
                <ActionIcon
                  variant="subtle"
                  color="#59B5F8"
                  size="md"
                  radius="xl"
                  onClick={() => navigate("/help")}
                >
                  <IconHelp size={20} />
                </ActionIcon>
              </Tooltip>
            </>
          )}

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
                <Menu.Item
                  leftSection={<IconUser size={16} />}
                  onClick={() => navigate("/profile")}
                >
                  プロフィール
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings size={16} />}
                  onClick={() => navigate("/setting")}
                >
                  設定
                </Menu.Item>
                {isMobile && (
                  <>
                    <Menu.Item
                      leftSection={<IconBell size={16} />}
                      onClick={() => setIsNotificationModalOpen(true)}
                    >
                      通知
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        isDark ? <IconSun size={16} /> : <IconMoon size={16} />
                      }
                      onClick={() => setColorScheme(isDark ? "light" : "dark")}
                    >
                      {isDark ? "ライトモード" : "ダークモード"}
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconHelp size={16} />}
                      onClick={() => navigate("/help")}
                    >
                      ヘルプ
                    </Menu.Item>
                  </>
                )}
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
