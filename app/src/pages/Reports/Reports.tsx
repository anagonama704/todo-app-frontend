import {
  Container,
  Title,
  Card,
  Grid,
  Text,
  Group,
  Stack,
  Progress,
  Badge,
  Table,
  ThemeIcon,
} from "@mantine/core";
import {
  IconChartBar,
  IconCheck,
  IconAlertTriangle,
  IconUsers,
} from "@tabler/icons-react";
import { useProjectsStore } from "../../features/projects/store/projects";
import { useTasksStore } from "../../features/tasks/store/tasks";

const Reports = () => {
  const { projects } = useProjectsStore();
  const { tasks } = useTasksStore();

  // プロジェクトの進捗状況を計算
  const projectProgress = projects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const completedTasks = projectTasks.filter(
      (task) => task.status === "completed" || task.status === "archived"
    ).length;
    const progress =
      projectTasks.length > 0
        ? Math.round((completedTasks / projectTasks.length) * 100)
        : 0;

    return {
      ...project,
      progress,
      totalTasks: projectTasks.length,
      completedTasks,
    };
  });

  // タスクの統計情報を計算
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(
      (task) => task.status === "completed" || task.status === "archived"
    ).length,
    inProgress: tasks.filter((task) => task.status === "in_progress").length,
    planning: tasks.filter((task) => task.status === "planning").length,
  };

  // 担当者ごとのタスク数を計算
  const assigneeTaskCounts = tasks.reduce(
    (acc, task) => {
      acc[task.assigneeId] = (acc[task.assigneeId] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // 優先度別のタスク数を計算
  const priorityStats = tasks.reduce(
    (acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const renderProjectProgress = () => (
    <Card withBorder h={400} style={{ overflow: "auto" }} pt={0}>
      <Group
        mb="md"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "20px 0",
        }}
      >
        <ThemeIcon color="blue" size="lg" radius="md">
          <IconChartBar size={20} />
        </ThemeIcon>
        <Title order={3}>プロジェクト進捗状況</Title>
      </Group>

      <Stack gap="md">
        {projectProgress.map((project) => (
          <div key={project.id}>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{project.title}</Text>
              <Text size="sm" c="dimmed">
                {project.completedTasks}/{project.totalTasks} タスク完了
              </Text>
            </Group>
            <Progress
              value={project.progress}
              color={project.progress === 100 ? "green" : "blue"}
              size="xl"
              radius="xl"
            />
          </div>
        ))}
      </Stack>
    </Card>
  );

  const renderTaskStats = () => (
    <Card withBorder>
      <Group mb="md">
        <ThemeIcon color="green" size="lg" radius="md">
          <IconCheck size={20} />
        </ThemeIcon>
        <Title order={3}>タスク統計</Title>
      </Group>

      <Grid>
        <Grid.Col span={4}>
          <Stack align="center" gap="xs">
            <Text size="xl" fw={700}>
              {taskStats.total}
            </Text>
            <Text size="sm" c="dimmed">
              総タスク数
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack align="center" gap="xs">
            <Text size="xl" fw={700} c="green">
              {taskStats.completed}
            </Text>
            <Text size="sm" c="dimmed">
              完了タスク
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack align="center" gap="xs">
            <Text size="xl" fw={700} c="blue">
              {taskStats.inProgress}
            </Text>
            <Text size="sm" c="dimmed">
              進行中タスク
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );

  const renderPriorityStats = () => (
    <Card withBorder>
      <Group mb="md">
        <ThemeIcon color="red" size="lg" radius="md">
          <IconAlertTriangle size={20} />
        </ThemeIcon>
        <Title order={3}>優先度別タスク数</Title>
      </Group>

      <Stack gap="md">
        <div>
          <Group justify="space-between" mb="xs">
            <Text>優先度高</Text>
            <Badge color="red">{priorityStats.high || 0}</Badge>
          </Group>
          <Progress
            value={((priorityStats.high || 0) / taskStats.total) * 100}
            color="red"
            size="xl"
            radius="xl"
          />
        </div>
        <div>
          <Group justify="space-between" mb="xs">
            <Text>優先度中</Text>
            <Badge color="yellow">{priorityStats.medium || 0}</Badge>
          </Group>
          <Progress
            value={((priorityStats.medium || 0) / taskStats.total) * 100}
            color="yellow"
            size="xl"
            radius="xl"
          />
        </div>
        <div>
          <Group justify="space-between" mb="xs">
            <Text>優先度低</Text>
            <Badge color="green">{priorityStats.low || 0}</Badge>
          </Group>
          <Progress
            value={((priorityStats.low || 0) / taskStats.total) * 100}
            color="green"
            size="xl"
            radius="xl"
          />
        </div>
      </Stack>
    </Card>
  );

  const renderAssigneeStats = () => (
    <Card withBorder h={400} style={{ overflow: "auto" }} pt={0}>
      <Group
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "20px 0 40px 0",
        }}
      >
        <ThemeIcon color="violet" size="lg" radius="md">
          <IconUsers size={20} />
        </ThemeIcon>
        <Title order={3}>担当者別タスク数</Title>
      </Group>

      <Table>
        <Table.Thead
          style={{
            position: "sticky",
            top: 70,
            zIndex: 1000,
          }}
        >
          <Table.Tr>
            <Table.Th>担当者</Table.Th>
            <Table.Th>タスク数</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.entries(assigneeTaskCounts).map(([assigneeId, count]) => (
            <Table.Tr key={assigneeId}>
              <Table.Td>{assigneeId}</Table.Td>
              <Table.Td>{count}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Stack gap={4}>
            <Title order={1} size="h2" fw={700}>
              レポート
            </Title>
            <Text size="sm" c="dimmed">
              プロジェクトの進捗状況やタスクの統計情報を確認できます
            </Text>
          </Stack>
        </Group>

        <Grid>
          <Grid.Col span={8}>{renderProjectProgress()}</Grid.Col>
          <Grid.Col span={4}>{renderTaskStats()}</Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>{renderPriorityStats()}</Grid.Col>
          <Grid.Col span={6}>{renderAssigneeStats()}</Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export { Reports };
