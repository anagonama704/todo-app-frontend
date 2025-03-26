import {
  Container,
  Title,
  Card,
  Grid,
  Text,
  Group,
  Stack,
  Badge,
  Table,
  ThemeIcon,
  Button,
  Center,
  Paper,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconClock,
  IconCheck,
  IconArchive,
} from "@tabler/icons-react";
import { useTasksStore } from "../../features/tasks/store/tasks";
import { useEffect } from "react";

export const Important = () => {
  const { tasks, error, fetchTasks } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  // 高優先度のタスクを取得
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");

  // 期限切れが近いタスクを取得（7日以内）
  const upcomingDueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  if (error) {
    return (
      <Container size="xl" h="80vh">
        <Center h="100%">
          <Paper p="xl" radius="md" withBorder>
            <Stack align="center" gap="md">
              <Text size="lg" c="red">
                {error}
              </Text>
              <Button variant="light" onClick={fetchTasks}>
                再試行
              </Button>
            </Stack>
          </Paper>
        </Center>
      </Container>
    );
  }

  const renderHighPriorityTasks = () => (
    <Card withBorder>
      <Group mb="md">
        <ThemeIcon color="red" size="lg" radius="md">
          <IconAlertTriangle size={20} />
        </ThemeIcon>
        <Title order={3}>高優先度タスク</Title>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>プロジェクト</Table.Th>
            <Table.Th>担当者</Table.Th>
            <Table.Th>期限</Table.Th>
            <Table.Th>ステータス</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {highPriorityTasks.map((task) => (
            <Table.Tr key={task.id}>
              <Table.Td>{task.title}</Table.Td>
              <Table.Td>{task.projectId}</Table.Td>
              <Table.Td>{task.assigneeId}</Table.Td>
              <Table.Td>{formatDate(task.dueDate)}</Table.Td>
              <Table.Td>
                <Badge
                  color={
                    task.status === "completed" || task.status === "archived"
                      ? "green"
                      : task.status === "in_progress"
                        ? "blue"
                        : "gray"
                  }
                >
                  {task.status === "completed"
                    ? "完了"
                    : task.status === "archived"
                      ? "アーカイブ"
                      : task.status === "in_progress"
                        ? "進行中"
                        : "未着手"}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    variant="light"
                    size="xs"
                    color="green"
                    leftSection={<IconCheck size={14} />}
                  >
                    完了
                  </Button>
                  <Button
                    variant="light"
                    size="xs"
                    color="gray"
                    leftSection={<IconArchive size={14} />}
                  >
                    アーカイブ
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );

  const renderUpcomingDueTasks = () => (
    <Card withBorder>
      <Group mb="md">
        <ThemeIcon color="orange" size="lg" radius="md">
          <IconClock size={20} />
        </ThemeIcon>
        <Title order={3}>期限切れが近いタスク</Title>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>タイトル</Table.Th>
            <Table.Th>プロジェクト</Table.Th>
            <Table.Th>担当者</Table.Th>
            <Table.Th>期限</Table.Th>
            <Table.Th>ステータス</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {upcomingDueTasks.map((task) => (
            <Table.Tr key={task.id}>
              <Table.Td>{task.title}</Table.Td>
              <Table.Td>{task.projectId}</Table.Td>
              <Table.Td>{task.assigneeId}</Table.Td>
              <Table.Td>{formatDate(task.dueDate)}</Table.Td>
              <Table.Td>
                <Badge
                  color={
                    task.status === "completed" || task.status === "archived"
                      ? "green"
                      : task.status === "in_progress"
                        ? "blue"
                        : "gray"
                  }
                >
                  {task.status === "completed"
                    ? "完了"
                    : task.status === "archived"
                      ? "アーカイブ"
                      : task.status === "in_progress"
                        ? "進行中"
                        : "未着手"}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    variant="light"
                    size="xs"
                    color="green"
                    leftSection={<IconCheck size={14} />}
                  >
                    完了
                  </Button>
                  <Button
                    variant="light"
                    size="xs"
                    color="gray"
                    leftSection={<IconArchive size={14} />}
                  >
                    アーカイブ
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>重要タスク</Title>

        <Grid>
          <Grid.Col span={12}>{renderHighPriorityTasks()}</Grid.Col>
          <Grid.Col span={12}>{renderUpcomingDueTasks()}</Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};
