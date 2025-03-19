import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Progress,
  ActionIcon,
  Menu,
  TextInput,
  Select,
  Box,
  Center,
  Paper,
  ScrollArea,
  Transition,
  Modal,
  ThemeIcon,
  Divider,
  Drawer,
  NavLink,
  rem,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconFolder,
  IconArrowRight,
  IconDots,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconHome,
  IconCalendar,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import { useProjectsStore } from "../../features/projects/store/projects";
import {
  ProjectStatus,
  ProjectPriority,
  Project,
} from "../../features/projects/types/project";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const statusColors: Record<ProjectStatus, string> = {
  planning: "blue",
  in_progress: "yellow",
  completed: "green",
  archived: "gray",
};

const priorityColors: Record<ProjectPriority, string> = {
  low: "blue",
  medium: "yellow",
  high: "red",
};

const statusLabels: Record<ProjectStatus, string> = {
  planning: "計画中",
  in_progress: "進行中",
  completed: "完了",
  archived: "アーカイブ",
};

export function Projects() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { projects, isLoading, error, fetchProjects, deleteProject } =
    useProjectsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "progress">(
    "createdAt"
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async () => {
    if (!selectedProject) return;
    try {
      await deleteProject(selectedProject.id);
      notifications.show({
        title: "プロジェクトを削除しました",
        message: "プロジェクトが正常に削除されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      setIsDeleteModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "プロジェクトの削除に失敗しました",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "dueDate":
          if (!a.dueDate || !b.dueDate) return 0;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return <Text>読み込み中...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Box>
      <Container size="xl" h="80vh" style={{ overflow: "hidden" }}>
        <Stack h="100%" gap="md">
          <Group>
            <Stack gap={4}>
              <Title order={1} size="h2" fw={700}>
                プロジェクト
              </Title>
              <Text size="sm" c="dimmed">
                プロジェクトの一覧を表示・管理します
              </Text>
            </Stack>
          </Group>

          <Group justify="flex-end">
            <Button
              onClick={() => navigate("/projects/new")}
              leftSection={<IconFolder size={16} />}
              variant="light"
              color="blue"
            >
              新規プロジェクト
            </Button>
          </Group>

          <Group align="flex-end">
            <TextInput
              placeholder="プロジェクトを検索..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <Select
              label="ステータス"
              data={[
                { value: "all", label: "すべて" },
                { value: "planning", label: "計画中" },
                { value: "in_progress", label: "進行中" },
                { value: "completed", label: "完了" },
                { value: "archived", label: "アーカイブ" },
              ]}
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(value as ProjectStatus | "all")
              }
              style={{ width: 200 }}
            />
            <Select
              label="並び替え"
              data={[
                { value: "createdAt", label: "作成日時" },
                { value: "dueDate", label: "期限日" },
                { value: "progress", label: "進捗" },
              ]}
              value={sortBy}
              onChange={(value) =>
                setSortBy(value as "createdAt" | "dueDate" | "progress")
              }
              style={{ width: 200 }}
            />
          </Group>

          <Box style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <ScrollArea h="100%">
              {filteredProjects.length === 0 ? (
                <Center h="100%">
                  <Paper p="xl" radius="md" withBorder>
                    <Stack align="center" gap="md">
                      <IconFolder size={48} color="gray" />
                      <Text size="lg" color="dimmed">
                        プロジェクトが見つかりません
                      </Text>
                      <Button
                        variant="light"
                        onClick={() => navigate("/projects/new")}
                      >
                        新規プロジェクトを作成
                      </Button>
                    </Stack>
                  </Paper>
                </Center>
              ) : (
                <Grid style={{ overflow: "hidden" }}>
                  {filteredProjects.map((project) => (
                    <Grid.Col
                      key={project.id}
                      span={{ base: 12, sm: 6, md: 4 }}
                    >
                      <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        h="100%"
                        style={{
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.top = "4px";
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(0,0,0,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 1px 3px rgba(0,0,0,0.1)";
                        }}
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <Card.Section withBorder inheritPadding py="xs">
                          <Group justify="space-between">
                            <Badge color={statusColors[project.status]}>
                              {statusLabels[project.status]}
                            </Badge>
                            <Menu position="bottom-end">
                              <Menu.Target>
                                <ActionIcon
                                  variant="subtle"
                                  color="gray"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <IconDots size={16} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item
                                  leftSection={<IconEdit size={14} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/projects/${project.id}/edit`);
                                  }}
                                >
                                  編集
                                </Menu.Item>
                                <Menu.Item
                                  leftSection={<IconTrash size={14} />}
                                  color="red"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProject(project);
                                    setIsDeleteModalOpen(true);
                                  }}
                                >
                                  削除
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </Card.Section>

                        <Stack gap="xs" mt="md" h="100%" pos="relative">
                          <Group justify="space-between" align="flex-start">
                            <Title order={3} lineClamp={1} style={{ flex: 1 }}>
                              {project.title}
                            </Title>
                            <Transition
                              mounted={true}
                              transition="fade"
                              duration={200}
                            >
                              {(styles) => (
                                <IconArrowRight
                                  size={16}
                                  style={{
                                    ...styles,
                                    opacity: 0,
                                    transition: "opacity 0.2s ease",
                                  }}
                                  className="hover-arrow"
                                />
                              )}
                            </Transition>
                          </Group>
                          <Box h={40}>
                            {project.description && (
                              <Text
                                size="sm"
                                color="dimmed"
                                lineClamp={2}
                                h="100%"
                              >
                                {project.description}
                              </Text>
                            )}
                          </Box>
                          <Group gap="xs">
                            <Badge color={priorityColors[project.priority]}>
                              {project.priority === "high"
                                ? "高"
                                : project.priority === "medium"
                                  ? "中"
                                  : "低"}
                            </Badge>
                            {project.dueDate && (
                              <Text size="sm" color="dimmed">
                                期限日:{" "}
                                {new Date(project.dueDate).toLocaleDateString()}
                              </Text>
                            )}
                          </Group>
                          <Progress value={project.progress} size="sm" />
                          <Text size="sm" color="dimmed">
                            進捗: {project.progress}%
                          </Text>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </ScrollArea>
          </Box>
        </Stack>
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size="100%"
        padding="md"
        position="left"
        zIndex={1000}
      >
        <Stack gap="xs">
          <NavLink
            label="ホーム"
            leftSection={<IconHome size={rem(20)} stroke={1.5} />}
            onClick={() => {
              navigate("/");
              setOpened(false);
            }}
          />
          <NavLink
            label="プロジェクト"
            leftSection={<IconFolder size={rem(20)} stroke={1.5} />}
            active
            onClick={() => {
              navigate("/projects");
              setOpened(false);
            }}
          />
          <NavLink
            label="カレンダー"
            leftSection={<IconCalendar size={rem(20)} stroke={1.5} />}
            onClick={() => {
              navigate("/calendar");
              setOpened(false);
            }}
          />
          <NavLink
            label="チーム"
            leftSection={<IconUsers size={rem(20)} stroke={1.5} />}
            onClick={() => {
              navigate("/team");
              setOpened(false);
            }}
          />
          <NavLink
            label="設定"
            leftSection={<IconSettings size={rem(20)} stroke={1.5} />}
            onClick={() => {
              navigate("/settings");
              setOpened(false);
            }}
          />
        </Stack>
      </Drawer>

      {/* 削除確認モーダル */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="プロジェクトの削除"
        centered
        size="md"
      >
        <Stack gap="md">
          <Group gap="xs">
            <ThemeIcon color="red" size="lg" radius="xl">
              <IconAlertTriangle size={20} />
            </ThemeIcon>
            <Text fw={500} size="lg">
              このプロジェクトを削除しますか？
            </Text>
          </Group>

          <Text color="dimmed">
            この操作は取り消せません。プロジェクト「{selectedProject?.title}
            」とそれに関連するすべてのタスクが完全に削除されます。
          </Text>

          <Divider my="sm" />

          <Group justify="right" gap="sm">
            <Button
              variant="default"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              キャンセル
            </Button>
            <Button color="red" onClick={handleDelete}>
              削除する
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
