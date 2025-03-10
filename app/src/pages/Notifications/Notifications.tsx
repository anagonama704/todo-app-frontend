import {
  Container,
  Paper,
  Title,
  Stack,
  Text,
  Group,
  Badge,
  Divider,
  Button,
  Pagination,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useState } from "react";

export const Notifications = () => {
  const [activePage, setActivePage] = useState(1);

  // モックの通知データ
  const notifications = [
    {
      id: 1,
      title: "タスクの期限が近づいています",
      message: "「レポート作成」の期限が3時間後に迫っています",
      createdAt: "2024-03-20T10:00:00Z",
      type: "warning",
    },
    {
      id: 2,
      title: "新しいタスクが割り当てられました",
      message: "「ミーティング資料作成」が割り当てられました",
      createdAt: "2024-03-20T09:30:00Z",
      type: "info",
    },
    {
      id: 3,
      title: "タスクが完了しました",
      message: "「コードレビュー」が完了しました",
      createdAt: "2024-03-20T09:00:00Z",
      type: "success",
    },
    {
      id: 4,
      title: "タスクの期限が過ぎています",
      message: "「企画書作成」の期限が1時間過ぎています",
      createdAt: "2024-03-20T08:00:00Z",
      type: "error",
    },
    {
      id: 5,
      title: "タスクが更新されました",
      message: "「プロジェクト計画」の内容が更新されました",
      createdAt: "2024-03-20T07:30:00Z",
      type: "info",
    },
  ];

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "yellow";
      case "info":
        return "blue";
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container size="md" py="xl">
      <Group mb="xl">
        <IconBell size={24} color="#59B5F8" />
        <Title order={2}>通知一覧</Title>
      </Group>

      <Stack gap="md">
        {notifications.map((notification) => (
          <Paper key={notification.id} withBorder p="md" radius="md">
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{notification.title}</Text>
              <Badge color={getBadgeColor(notification.type)}>
                {notification.type === "warning" && "期限間近"}
                {notification.type === "info" && "情報"}
                {notification.type === "success" && "完了"}
                {notification.type === "error" && "期限超過"}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="xs">
              {notification.message}
            </Text>
            <Text size="xs" c="dimmed">
              {new Date(notification.createdAt).toLocaleString("ja-JP")}
            </Text>
          </Paper>
        ))}
      </Stack>

      <Divider my="xl" />

      <Group justify="center">
        <Pagination
          total={5}
          value={activePage}
          onChange={setActivePage}
          color="#59B5F8"
        />
      </Group>
    </Container>
  );
};
