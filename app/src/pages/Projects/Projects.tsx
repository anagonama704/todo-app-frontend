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
  MultiSelect,
  TagsInput,
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
import { useTagsStore } from "../../features/tags/store/tags";
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
  const { tags, fetchTags } = useTagsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all"
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "progress">(
    "createdAt"
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchTags();
  }, [fetchProjects, fetchTags]);

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
      const matchesTags =
        selectedTagIds.length === 0 ||
        selectedTagIds.every((tagId) => project.tags?.includes(tagId));
      return matchesSearch && matchesStatus && matchesTags;
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
            <TagsInput
              label="タグ"
              placeholder="タグで絞り込み"
              maxTags={2}
              data={tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
                color: tag.color,
              }))}
              value={selectedTagIds}
              onChange={setSelectedTagIds}
              clearable
              style={{ width: 300 }}
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
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <Stack gap="md">
                          <Group justify="space-between">
                            <Text fw={500} size="lg" lineClamp={1}>
                              {project.title}
                            </Text>
                            <Menu position="bottom-end">
                              <Menu.Target>
                                <ActionIcon
                                  variant="subtle"
                                  color="gray"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
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

                          <Text size="sm" c="dimmed" lineClamp={2}>
                            {project.description}
                          </Text>

                          <Group gap="xs">
                            <Badge
                              color={statusColors[project.status]}
                              variant="light"
                            >
                              {statusLabels[project.status]}
                            </Badge>
                            <Badge
                              color={priorityColors[project.priority]}
                              variant="light"
                            >
                              {project.priority === "high"
                                ? "高"
                                : project.priority === "medium"
                                  ? "中"
                                  : "低"}
                            </Badge>
                            {project.tags?.map((tagId) => {
                              const tag = tags.find((t) => t.id === tagId);
                              return tag ? (
                                <Badge
                                  key={tag.id}
                                  color={tag.color}
                                  variant="light"
                                >
                                  {tag.name}
                                </Badge>
                              ) : null;
                            })}
                          </Group>

                          <Progress
                            value={project.progress}
                            color="blue"
                            size="sm"
                          />

                          <Group justify="space-between" c="dimmed">
                            <Text size="sm">
                              期限:{" "}
                              {project.dueDate
                                ? new Date(project.dueDate).toLocaleDateString(
                                    "ja-JP"
                                  )
                                : "未設定"}
                            </Text>
                            <Text size="sm">
                              作成:{" "}
                              {new Date(project.createdAt).toLocaleDateString(
                                "ja-JP"
                              )}
                            </Text>
                          </Group>
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
