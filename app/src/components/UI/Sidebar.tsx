import { NavLink, Stack, Text, Box, Flex, Divider } from "@mantine/core";
import {
  IconDashboard,
  IconCalendar,
  IconCheckbox,
  IconStar,
  IconClock,
  IconChecks,
  IconFolder,
  IconTags,
  IconChartBar,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const mainMenuItems = [
    {
      label: "ダッシュボード",
      icon: <IconDashboard size={20} />,
      path: "/dashboard",
    },
    {
      label: "カレンダー",
      icon: <IconCalendar size={20} />,
      path: "/calendar",
    },
  ];

  const taskMenuItems = [
    {
      label: "今日のタスク",
      icon: <IconCheckbox size={20} />,
      path: "/tasks/today",
    },
    {
      label: "重要タスク",
      icon: <IconStar size={20} />,
      path: "/tasks/important",
    },
    {
      label: "期限切れ",
      icon: <IconClock size={20} />,
      path: "/tasks/overdue",
    },
    {
      label: "完了済み",
      icon: <IconChecks size={20} />,
      path: "/tasks/completed",
    },
  ];

  const organizationMenuItems = [
    {
      label: "プロジェクト",
      icon: <IconFolder size={20} />,
      path: "/projects",
    },
    { label: "タグ", icon: <IconTags size={20} />, path: "/tags" },
    { label: "レポート", icon: <IconChartBar size={20} />, path: "/reports" },
  ];

  return (
    <Flex direction="column" justify="space-between" h="100%" p="md">
      <Stack>
        {/* メインメニュー */}
        <Stack gap="xs">
          {mainMenuItems.map((item) => (
            <NavLink
              key={item.path}
              label={item.label}
              leftSection={item.icon}
              active={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              variant={pathname === item.path ? "filled" : "light"}
            />
          ))}
        </Stack>

        <Divider />

        {/* タスク管理 */}
        <Stack gap="xs">
          <Text size="sm" fw={500} c="dimmed">
            タスク管理
          </Text>
          {taskMenuItems.map((item) => (
            <NavLink
              key={item.path}
              label={item.label}
              leftSection={item.icon}
              active={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              variant={pathname === item.path ? "filled" : "light"}
            />
          ))}
        </Stack>

        <Divider />

        {/* 整理・分析 */}
        <Stack gap="xs">
          <Text size="sm" fw={500} c="dimmed">
            整理・分析
          </Text>
          {organizationMenuItems.map((item) => (
            <NavLink
              key={item.path}
              label={item.label}
              leftSection={item.icon}
              active={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              variant={pathname === item.path ? "filled" : "light"}
            />
          ))}
        </Stack>
      </Stack>

      {/* コピーライト */}
      <Box pt="xl">
        <Text size="xs" c="dimmed" ta="center">
          © 2025 Todo App All Rights Reserved.
        </Text>
      </Box>
    </Flex>
  );
};
