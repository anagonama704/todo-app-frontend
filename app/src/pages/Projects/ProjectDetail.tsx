import { useParams, useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../features/projects/store/projects";
import {
  Container,
  Title,
  Text,
  Group,
  Badge,
  Progress,
  Stack,
  Card,
  ActionIcon,
  Button,
  Grid,
  Avatar,
  List,
  ThemeIcon,
  Tabs,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconCalendar,
  IconFlag,
  IconUsers,
  IconTag,
  IconCheck,
  IconX,
  IconClock,
  IconInfoCircle,
  IconList,
  IconChartBar,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjectsStore();
  const project = projects.find((project) => project.id === id);
  const [activeTab, setActiveTab] = useState<string | null>("details");

  if (!project || !id) {
    return (
      <Container>
        <Text>プロジェクトが見つかりません</Text>
      </Container>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("このプロジェクトを削除してもよろしいですか？")) {
      try {
        await deleteProject(id);
        notifications.show({
          title: "プロジェクトを削除しました",
          message: "プロジェクトが正常に削除されました",
          color: "green",
          icon: <IconCheck size={16} />,
        });
        navigate("/projects");
      } catch (error) {
        notifications.show({
          title: "エラーが発生しました",
          message: "プロジェクトの削除に失敗しました",
          color: "red",
          icon: <IconX size={16} />,
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "blue";
      case "in_progress":
        return "yellow";
      case "completed":
        return "green";
      case "archived":
        return "gray";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planning":
        return "計画中";
      case "in_progress":
        return "進行中";
      case "completed":
        return "完了";
      case "archived":
        return "アーカイブ";
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "高";
      case "medium":
        return "中";
      case "low":
        return "低";
      default:
        return priority;
    }
  };

  const renderProjectDetails = () => (
    <Grid>
      {/* 左カラム：プロジェクト情報 */}
      <Grid.Col span={8}>
        <Stack gap="md">
          {/* 説明 */}
          <Card withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              プロジェクトの説明
            </Text>
            <Text>{project.description || "説明はありません"}</Text>
          </Card>

          {/* 進捗状況 */}
          <Card withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                進捗状況
              </Text>
              <Text size="sm" fw={500}>
                {project.progress}%
              </Text>
            </Group>
            <Progress
              value={project.progress}
              color={project.progress === 100 ? "green" : "blue"}
              size="xl"
              radius="xl"
            />
          </Card>
        </Stack>
      </Grid.Col>

      {/* 右カラム：メタ情報 */}
      <Grid.Col span={4}>
        <Stack gap="md">
          {/* 日付情報 */}
          <Card withBorder>
            <Stack gap="xs">
              <Group align="center">
                <IconCalendar size={16} color="gray" />
                <Text size="sm" c="dimmed">
                  期限
                </Text>
                <Text>
                  {project.dueDate
                    ? new Date(project.dueDate).toLocaleDateString("ja-JP")
                    : "未設定"}
                </Text>
              </Group>
              <Group>
                <IconClock size={16} color="gray" />
                <Text size="sm" c="dimmed">
                  作成日
                </Text>
                <Text>
                  {new Date(project.createdAt).toLocaleDateString("ja-JP")}
                </Text>
              </Group>
            </Stack>
          </Card>

          {/* メンバー */}
          <Card withBorder>
            <Group justify="space-between" mb="xs">
              <Group>
                <IconUsers size={16} color="gray" />
                <Text size="sm" c="dimmed">
                  メンバー
                </Text>
              </Group>
              <Button variant="light" size="xs">
                メンバーを追加
              </Button>
            </Group>
            <Group gap="xs">
              {project.members?.map((member) => (
                <Avatar
                  key={member}
                  size="md"
                  radius="xl"
                  color="blue"
                  src={null}
                >
                  {member[0]}
                </Avatar>
              ))}
            </Group>
          </Card>

          {/* タグ */}
          <Card withBorder>
            <Group mb="xs">
              <IconTag size={16} color="gray" />
              <Text size="sm" c="dimmed">
                タグ
              </Text>
            </Group>
            <Group gap="xs">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Card>
        </Stack>
      </Grid.Col>
    </Grid>
  );

  const renderTaskList = () => (
    <Card withBorder>
      <Group justify="space-between" mb="md">
        <Text size="sm" fw={500}>
          タスク一覧
        </Text>
        <Button
          variant="light"
          size="xs"
          onClick={() => navigate(`/projects/${id}/tasks/new`)}
        >
          タスクを追加
        </Button>
      </Group>
      {project.tasks.length > 0 ? (
        <List spacing="xs" size="sm" center>
          {project.tasks.map((task) => (
            <List.Item
              key={task.id}
              icon={
                <ThemeIcon
                  color={task.completedAt ? "green" : "blue"}
                  size={24}
                  radius="xl"
                >
                  {task.completedAt ? (
                    <IconCheck size={16} />
                  ) : (
                    <IconClock size={16} />
                  )}
                </ThemeIcon>
              }
            >
              <Group justify="space-between" w="100%">
                <Stack gap={0}>
                  <Text>{task.title}</Text>
                  {task.description && (
                    <Text size="xs" c="dimmed">
                      {task.description}
                    </Text>
                  )}
                </Stack>
                <Group gap="xs">
                  <Badge
                    color={getPriorityColor(task.priority)}
                    variant="light"
                  >
                    {getPriorityLabel(task.priority)}
                  </Badge>
                  {task.dueDate && (
                    <Text size="xs" c="dimmed">
                      期限: {new Date(task.dueDate).toLocaleDateString("ja-JP")}
                    </Text>
                  )}
                </Group>
              </Group>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text c="dimmed" ta="center">
          タスクはまだありません
        </Text>
      )}
    </Card>
  );

  const renderGanttChart = () => (
    <Card withBorder p="md">
      <Text ta="center" c="dimmed">
        ガントチャート機能は開発中です
      </Text>
    </Card>
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* ヘッダー */}
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Title order={1}>{project.title}</Title>
            <Group>
              <Badge color={getStatusColor(project.status)} size="lg">
                {getStatusLabel(project.status)}
              </Badge>
              <Badge color={getPriorityColor(project.priority)} size="lg">
                優先度: {getPriorityLabel(project.priority)}
              </Badge>
            </Group>
          </Stack>
          <Group>
            <Button
              variant="light"
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/projects/${id}/edit`)}
            >
              編集
            </Button>
            <ActionIcon
              variant="light"
              color="red"
              size="lg"
              onClick={handleDelete}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Group>

        {/* タブ */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab
              value="details"
              leftSection={<IconInfoCircle size={16} />}
            >
              プロジェクト詳細
            </Tabs.Tab>
            <Tabs.Tab value="tasks" leftSection={<IconList size={16} />}>
              タスク一覧
            </Tabs.Tab>
            <Tabs.Tab value="gantt" leftSection={<IconChartBar size={16} />}>
              ガントチャート
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="details" pt="xl">
            {renderProjectDetails()}
          </Tabs.Panel>

          <Tabs.Panel value="tasks" pt="xl">
            {renderTaskList()}
          </Tabs.Panel>

          <Tabs.Panel value="gantt" pt="xl">
            {renderGanttChart()}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default ProjectDetail;
