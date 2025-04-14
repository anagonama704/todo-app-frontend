import { useParams, useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../features/projects/store/projects";
import { useTasksStore } from "../../features/tasks/store/tasks";
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
  ThemeIcon,
  Tabs,
  Table,
  Select,
  Modal,
  Divider,
  TextInput,
  NumberInput,
  Textarea,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconCalendar,
  IconUsers,
  IconTag,
  IconCheck,
  IconX,
  IconClock,
  IconInfoCircle,
  IconList,
  IconChartBar,
  IconAlertTriangle,
  IconPlus,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import {
  Task,
  TaskStatus,
  TaskPriority,
  CreateTaskInput,
} from "../../features/tasks/types/task";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, deleteProject, updateProject } = useProjectsStore();
  const { tasks, updateTask } = useTasksStore();
  const project = projects.find((project) => project.id === id);
  const [activeTab, setActiveTab] = useState<string | null>("details");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectProgress, setProjectProgress] = useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<CreateTaskInput>({
    title: "",
    description: "",
    status: "planning",
    priority: "medium",
    projectId: id || "",
    assigneeId: "",
    tags: [],
    progress: 0,
    dueDate: new Date().toISOString(),
  });

  // プロジェクトの進捗度を計算する関数
  const calculateProjectProgress = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(
      (task) => task.status === "completed" || task.status === "archived"
    ).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  // プロジェクトの進捗度を更新する関数
  const updateProjectProgress = () => {
    if (!project) return;
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const progress = calculateProjectProgress(projectTasks);
    updateProject(project.id, { progress });
  };

  // コンポーネントマウント時とタスク選択時に進捗状況を更新
  useEffect(() => {
    const progress = calculateProjectProgress(
      tasks.filter((task: Task) => task.projectId === id)
    );
    setProjectProgress(progress);
  }, [id, selectedTask]);

  // selectedTaskが変更されたらeditedTaskも更新
  useEffect(() => {
    if (selectedTask) {
      setNewTask({ ...selectedTask });
    }
  }, [selectedTask]);

  if (!project || !id) {
    return (
      <Container>
        <Text>プロジェクトが見つかりません</Text>
      </Container>
    );
  }

  const handleDelete = async () => {
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
  };

  // タスクの更新処理
  const handleTaskChange = async (field: string, value: any) => {
    if (!selectedTask) return;

    const updatedTask = { ...selectedTask, [field]: value };
    setNewTask(updatedTask);

    try {
      await updateTask(selectedTask.id, updatedTask);

      // タスクのステータスが変更された場合は進捗度を更新
      if (field === "status") {
        updateProjectProgress();
      }
    } catch (error) {
      console.error("タスクの更新に失敗しました:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      notifications.show({
        title: "タスクを作成しました",
        message: "タスクが正常に作成されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });

      setIsAddTaskModalOpen(false);
      setNewTask({
        title: "",
        description: "",
        status: "planning",
        priority: "medium",
        projectId: id || "",
        assigneeId: "",
        tags: [],
        progress: 0,
        dueDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("タスクの作成に失敗しました:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      // TODO: タスク削除のAPIを呼び出す
      notifications.show({
        title: "タスクを削除しました",
        message: "タスクが正常に削除されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      setIsDeleteTaskModalOpen(false);
      setSelectedTask(null);
      setNewTask({
        title: "",
        description: "",
        status: "planning",
        priority: "medium",
        projectId: id || "",
        assigneeId: "",
        tags: [],
        progress: 0,
        dueDate: new Date().toISOString(),
      });
      const progress = calculateProjectProgress(
        tasks.filter((task: Task) => task.projectId === id)
      );
      setProjectProgress(progress);
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "タスクの削除に失敗しました",
        color: "red",
        icon: <IconX size={16} />,
      });
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
                {projectProgress}%
              </Text>
            </Group>
            <Progress
              value={projectProgress}
              color={projectProgress === 100 ? "green" : "blue"}
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
                  期限日
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

  const renderTaskModal = () => {
    return (
      <>
        <Modal
          opened={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={
            newTask && (
              <TextInput
                value={newTask.title}
                onChange={(e) => handleTaskChange("title", e.target.value)}
                variant="unstyled"
                size="lg"
                placeholder="タスク名を入力"
              />
            )
          }
          size="lg"
        >
          {newTask && (
            <Stack gap="md">
              {/* タスクの説明 */}
              <div>
                <Text size="sm" c="dimmed" mb="xs">
                  説明
                </Text>
                <Textarea
                  value={newTask.description || ""}
                  onChange={(e) =>
                    handleTaskChange("description", e.target.value)
                  }
                  placeholder="説明を入力"
                  minRows={3}
                />
              </div>

              <Divider />

              {/* タスクのメタ情報 */}
              <Grid>
                <Grid.Col span={6}>
                  <Stack gap="sm">
                    <div>
                      <Text size="sm" c="dimmed" mb={4}>
                        ステータス
                      </Text>
                      <Select
                        value={newTask.status}
                        onChange={(value) =>
                          handleTaskChange("status", value as TaskStatus)
                        }
                        data={[
                          { value: "planning", label: "未着手" },
                          { value: "in_progress", label: "進行中" },
                          { value: "completed", label: "完了" },
                          { value: "archived", label: "アーカイブ" },
                        ]}
                        allowDeselect={false}
                      />
                    </div>

                    <div>
                      <Text size="sm" c="dimmed" mb={4}>
                        優先度
                      </Text>
                      <Select
                        value={newTask.priority}
                        onChange={(value) =>
                          handleTaskChange("priority", value as TaskPriority)
                        }
                        data={[
                          { value: "low", label: "低" },
                          { value: "medium", label: "中" },
                          { value: "high", label: "高" },
                        ]}
                        allowDeselect={false}
                      />
                    </div>

                    <div>
                      <Text size="sm" c="dimmed" mb={4}>
                        担当者
                      </Text>
                      <Group gap="xs">
                        <Avatar size="sm" radius="xl">
                          {newTask.assigneeId ? newTask.assigneeId[0] : "?"}
                        </Avatar>
                        <Select
                          value={newTask.assigneeId}
                          onChange={(value: string | null) => {
                            if (value) {
                              handleTaskChange("assigneeId", value);
                            }
                          }}
                          size="sm"
                          data={[
                            { value: "user1", label: "山田太郎" },
                            { value: "user2", label: "鈴木花子" },
                            { value: "user3", label: "佐藤一郎" },
                          ]}
                        />
                      </Group>
                    </div>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Stack gap="sm">
                    <div>
                      <Text size="sm" c="dimmed" mb={4}>
                        期限日
                      </Text>
                      <TextInput
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e?.target?.value) {
                            handleTaskChange("dueDate", e.target.value);
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Text size="sm" c="dimmed" mb={4}>
                        進捗率
                      </Text>
                      <NumberInput
                        value={newTask.progress}
                        onChange={(value) =>
                          handleTaskChange(
                            "progress",
                            typeof value === "number" ? value : 0
                          )
                        }
                        min={0}
                        max={100}
                        label="進捗率"
                      />
                    </div>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Divider />

              {/* タグ */}
              <div>
                <Text size="sm" c="dimmed" mb={4}>
                  タグ
                </Text>
                <TextInput
                  value={newTask.tags?.join(", ") || ""}
                  onChange={(e) =>
                    handleTaskChange(
                      "tags",
                      e.target.value.split(",").map((tag) => tag.trim())
                    )
                  }
                  placeholder="カンマ区切りでタグを入力"
                />
              </div>

              <Divider />

              {/* モーダルフッター */}
              <Group justify="space-between">
                <Button
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  onClick={() => setIsDeleteTaskModalOpen(true)}
                >
                  タスクを削除
                </Button>
                <Group>
                  <Button
                    variant="default"
                    onClick={() => setSelectedTask(null)}
                  >
                    キャンセル
                  </Button>
                  <Button onClick={() => setSelectedTask(null)}>保存</Button>
                </Group>
              </Group>
            </Stack>
          )}
        </Modal>

        {/* タスク削除確認モーダル */}
        <Modal
          opened={isDeleteTaskModalOpen}
          onClose={() => setIsDeleteTaskModalOpen(false)}
          title="タスクの削除"
          centered
          size="md"
        >
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon color="red" size="lg" radius="xl">
                <IconAlertTriangle size={20} />
              </ThemeIcon>
              <Text fw={500} size="lg">
                このタスクを削除しますか？
              </Text>
            </Group>

            <Text color="dimmed">
              この操作は取り消せません。タスク「{newTask.title}
              」が完全に削除されます。
            </Text>

            <Divider my="sm" />

            <Group justify="right" gap="sm">
              <Button
                variant="default"
                onClick={() => setIsDeleteTaskModalOpen(false)}
              >
                キャンセル
              </Button>
              <Button color="red" onClick={handleDeleteTask}>
                削除する
              </Button>
            </Group>
          </Stack>
        </Modal>
      </>
    );
  };

  const renderTaskList = () => {
    const projectTasks = tasks.filter((task) => task.projectId === id);
    const filteredTasks =
      statusFilter === "all"
        ? projectTasks
        : projectTasks.filter((task) => task.status === statusFilter);

    return (
      <Stack>
        <Group justify="space-between">
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || "all")}
            data={[
              { value: "all", label: "すべて" },
              { value: "planning", label: "未着手" },
              { value: "in_progress", label: "進行中" },
              { value: "completed", label: "完了" },
              { value: "archived", label: "アーカイブ" },
            ]}
            w={150}
          />
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            タスクを追加
          </Button>
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>タイトル</Table.Th>
              <Table.Th>優先度</Table.Th>
              <Table.Th>ステータス</Table.Th>
              <Table.Th>進捗</Table.Th>
              <Table.Th>期限</Table.Th>
              <Table.Th>担当者</Table.Th>
              <Table.Th>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredTasks.map((task) => (
              <Table.Tr
                key={task.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <Table.Td>{task.title}</Table.Td>
                <Table.Td>
                  <Badge color={getPriorityColor(task.priority)}>
                    {getPriorityLabel(task.priority)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(task.status)}>
                    {getStatusLabel(task.status)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Progress value={task.progress} size="sm" />
                </Table.Td>
                <Table.Td>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "未設定"}
                </Table.Td>
                <Table.Td>User {task.assigneeId}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                      }}
                    >
                      <IconEdit size={14} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                        setIsDeleteTaskModalOpen(true);
                      }}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    );
  };

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
              variant="outline"
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/projects/${id}/edit`)}
            >
              編集
            </Button>
            <ActionIcon
              variant="light"
              color="red"
              size="lg"
              onClick={() => setIsDeleteModalOpen(true)}
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
      {renderTaskModal()}

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
            この操作は取り消せません。プロジェクト「{project.title}
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

      {/* タスク追加モーダル */}
      <Modal
        opened={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="新規タスクの作成"
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="タイトル"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            styles={(theme) => ({
              input: {
                borderLeft: `4px solid ${theme.colors.blue[5]}`,
                paddingLeft: theme.spacing.sm,
              },
            })}
          />
          <TextInput
            label="説明"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            styles={(theme) => ({
              input: {
                borderLeft: `4px solid ${theme.colors.gray[5]}`,
                paddingLeft: theme.spacing.sm,
              },
            })}
          />

          <Divider />

          {/* タスクのメタ情報 */}
          <Grid>
            <Grid.Col span={6}>
              <Stack gap="sm">
                <div>
                  <Text size="sm" c="dimmed" mb={4}>
                    ステータス
                  </Text>
                  <Select
                    value={newTask.status}
                    onChange={(value) =>
                      setNewTask({ ...newTask, status: value as TaskStatus })
                    }
                    data={[
                      { value: "planning", label: "計画中" },
                      { value: "in_progress", label: "進行中" },
                      { value: "completed", label: "完了" },
                      { value: "archived", label: "アーカイブ" },
                    ]}
                    allowDeselect={false}
                  />
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={4}>
                    優先度
                  </Text>
                  <Select
                    value={newTask.priority}
                    onChange={(value) =>
                      setNewTask({
                        ...newTask,
                        priority: value as TaskPriority,
                      })
                    }
                    data={[
                      { value: "low", label: "低" },
                      { value: "medium", label: "中" },
                      { value: "high", label: "高" },
                    ]}
                    allowDeselect={false}
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${
                          newTask.priority === "high"
                            ? theme.colors.red[5]
                            : newTask.priority === "medium"
                              ? theme.colors.yellow[5]
                              : theme.colors.green[5]
                        }`,
                      },
                    })}
                  />
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={4}>
                    担当者
                  </Text>
                  <Group gap="xs">
                    <Avatar size="sm" radius="xl">
                      {newTask.assigneeId ? newTask.assigneeId[0] : "?"}
                    </Avatar>
                    <Select
                      value={newTask.assigneeId}
                      onChange={(value: string | null) => {
                        if (value) {
                          handleTaskChange("assigneeId", value);
                        }
                      }}
                      size="sm"
                      data={[
                        { value: "user1", label: "山田太郎" },
                        { value: "user2", label: "鈴木花子" },
                        { value: "user3", label: "佐藤一郎" },
                      ]}
                    />
                  </Group>
                </div>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack gap="sm">
                <div>
                  <Text size="sm" c="dimmed" mb={4}>
                    期限日
                  </Text>
                  <TextInput
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e?.target?.value) {
                        handleTaskChange("dueDate", e.target.value);
                      }
                    }}
                  />
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={4}>
                    進捗率
                  </Text>
                  <NumberInput
                    value={newTask.progress}
                    onChange={(value) =>
                      setNewTask({
                        ...newTask,
                        progress: typeof value === "number" ? value : 0,
                      })
                    }
                    min={0}
                    max={100}
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${theme.colors.cyan[5]}`,
                        paddingLeft: theme.spacing.sm,
                      },
                    })}
                  />
                </div>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider />

          {/* タグ */}
          <div>
            <Text size="sm" c="dimmed" mb={4}>
              タグ
            </Text>
            <TextInput
              value={newTask.tags?.join(", ") || ""}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
              placeholder="カンマ区切りでタグを入力"
              styles={(theme) => ({
                input: {
                  borderLeft: `4px solid ${theme.colors.teal[5]}`,
                  paddingLeft: theme.spacing.sm,
                },
              })}
            />
          </div>

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={() => setIsAddTaskModalOpen(false)}
            >
              キャンセル
            </Button>
            <Button onClick={handleAddTask} disabled={!newTask.title}>
              作成
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ProjectDetail;
