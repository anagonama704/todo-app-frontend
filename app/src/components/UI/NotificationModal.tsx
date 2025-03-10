import {
  Modal,
  Stack,
  Text,
  Group,
  Button,
  Divider,
  Badge,
  Paper,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

interface NotificationModalProps {
  opened: boolean;
  onClose: () => void;
}

export const NotificationModal = ({
  opened,
  onClose,
}: NotificationModalProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    onClose();
    navigate("/notifications");
  };

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

  const getBadgeText = (type: string) => {
    switch (type) {
      case "warning":
        return "期限間近";
      case "info":
        return "情報";
      case "success":
        return "完了";
      case "error":
        return "期限超過";
      default:
        return "その他";
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <IconBell size={20} color="#59B5F8" />
          <Text>通知</Text>
        </Group>
      }
      size="md"
    >
      <Stack gap="md">
        {notifications.map((notification) => (
          <Paper key={notification.id} withBorder p="md" radius="md">
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{notification.title}</Text>
              <Badge color={getBadgeColor(notification.type)}>
                {getBadgeText(notification.type)}
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

        <Divider />

        <Button
          onClick={handleNavigate}
          variant="light"
          color="#59B5F8"
          fullWidth
        >
          すべての通知を表示
        </Button>
      </Stack>
    </Modal>
  );
};
