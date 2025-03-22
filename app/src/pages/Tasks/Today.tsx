import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Card,
  Badge,
  Progress,
  Box,
  TextInput,
  Select,
  ScrollArea,
  Center,
  Paper,
  Button,
  ActionIcon,
  Menu,
  TagsInput,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconDots,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useTasksStore } from "../../features/tasks/store/tasks";
import { useTagsStore } from "../../features/tags/store/tags";
import {
  Task,
  TaskStatus,
  TaskPriority,
} from "../../features/tasks/types/task";
import { notifications } from "@mantine/notifications";

const statusColors: Record<TaskStatus, string> = {
  planning: "blue",
  in_progress: "yellow",
  completed: "green",
  archived: "gray",
};

const priorityColors: Record<TaskPriority, string> = {
  low: "blue",
  medium: "yellow",
  high: "red",
};

const statusLabels: Record<TaskStatus, string> = {
  planning: "計画中",
  in_progress: "進行中",
  completed: "完了",
  archived: "アーカイブ",
};

export const Today = () => {
  const { tasks, isLoading, error, fetchTasks, deleteTask } = useTasksStore();
  const { tags, fetchTags } = useTagsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "progress">(
    "priority"
  );

  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, [fetchTasks, fetchTags]);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      notifications.show({
        title: "タスクを削除しました",
        message: "タスクが正常に削除されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "タスクの削除に失敗しました",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  // 今日の日付のタスクのみをフィルタリング
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const filteredTasks = tasks
    .filter((task: Task) => {
      const taskDate = new Date(task.dueDate || "");
      const isToday = taskDate >= today && taskDate < tomorrow;

      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesTags =
        selectedTagIds.length === 0 ||
        selectedTagIds.every((tagId) => task.tags?.includes(tagId));

      return isToday && matchesSearch && matchesStatus && matchesTags;
    })
    .sort((a: Task, b: Task) => {
      switch (sortBy) {
        case "priority":
          return (
            (a.priority === "high" ? 2 : a.priority === "medium" ? 1 : 0) -
            (b.priority === "high" ? 2 : b.priority === "medium" ? 1 : 0)
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
                今日のタスク
              </Title>
              <Text size="sm" c="dimmed">
                今日が期限のタスクを表示・管理します
              </Text>
            </Stack>
          </Group>

          <Group justify="flex-end">
            <Button
              onClick={() => {
                /* タスク作成画面への遷移を実装 */
              }}
              leftSection={<IconPlus size={16} />}
              variant="light"
              color="blue"
            >
              新規タスク
            </Button>
          </Group>

          <Group align="flex-end">
            <TextInput
              placeholder="タスクを検索..."
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
              onChange={(value) => setStatusFilter(value as TaskStatus | "all")}
              style={{ width: 200 }}
            />
            <Select
              label="並び替え"
              data={[
                { value: "priority", label: "優先度" },
                { value: "dueDate", label: "期限" },
                { value: "progress", label: "進捗" },
              ]}
              value={sortBy}
              onChange={(value) =>
                setSortBy(value as "priority" | "dueDate" | "progress")
              }
              style={{ width: 200 }}
            />
          </Group>

          <Box style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <ScrollArea h="100%">
              {filteredTasks.length === 0 ? (
                <Center h="100%">
                  <Paper p="xl" radius="md" withBorder>
                    <Stack align="center" gap="md">
                      <IconPlus size={48} color="gray" />
                      <Text size="lg" color="dimmed">
                        今日のタスクはありません
                      </Text>
                      <Button
                        variant="light"
                        onClick={() => {
                          /* タスク作成画面への遷移を実装 */
                        }}
                      >
                        新規タスクを作成
                      </Button>
                    </Stack>
                  </Paper>
                </Center>
              ) : (
                <Stack gap="md">
                  {filteredTasks.map((task: Task) => (
                    <Card
                      key={task.id}
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      style={{
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Stack gap="md">
                        <Group justify="space-between">
                          <Text fw={500} size="lg" lineClamp={1}>
                            {task.title}
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
                                  // タスク編集画面への遷移を実装
                                }}
                              >
                                編集
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<IconTrash size={14} />}
                                color="red"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(task.id);
                                }}
                              >
                                削除
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>

                        <Text size="sm" c="dimmed" lineClamp={2}>
                          {task.description}
                        </Text>

                        <Group gap="xs">
                          <Badge
                            color={statusColors[task.status]}
                            variant="light"
                          >
                            {statusLabels[task.status]}
                          </Badge>
                          <Badge
                            color={priorityColors[task.priority]}
                            variant="light"
                          >
                            {task.priority === "high"
                              ? "高"
                              : task.priority === "medium"
                                ? "中"
                                : "低"}
                          </Badge>
                          {task.tags?.map((tagId) => {
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
                          value={task.progress}
                          color="blue"
                          size="sm"
                        />

                        <Group justify="space-between" c="dimmed">
                          <Text size="sm">
                            期限:{" "}
                            {new Date(task.dueDate || "").toLocaleTimeString(
                              "ja-JP"
                            )}
                          </Text>
                        </Group>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              )}
            </ScrollArea>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
