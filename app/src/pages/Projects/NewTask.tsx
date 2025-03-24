import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Stack,
  Card,
  Text,
  Grid,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";
import { useProjectsStore } from "../../features/projects/store/projects";
import { useTasksStore } from "../../features/tasks/store/tasks";
import { CreateTaskInput } from "../../features/tasks/types/task";
import "@mantine/dates/styles.css";

const NewTask = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjectsStore();
  const { createTask } = useTasksStore();
  const project = projects.find((p) => p.id === projectId);

  const [formData, setFormData] = useState<CreateTaskInput>({
    title: "",
    description: "",
    projectId: projectId || "",
    status: "planning",
    priority: "medium",
    assigneeId: "",
    tags: [],
    progress: 0,
    dueDate: new Date().toISOString(),
  });

  const [availableTags] = useState<string[]>(project?.tags || []);

  if (!project || !projectId) {
    return (
      <Container>
        <Text>プロジェクトが見つかりません</Text>
      </Container>
    );
  }

  const handleChange = (field: keyof CreateTaskInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      createTask(formData);
      notifications.show({
        title: "タスクを作成しました",
        message: "タスクが正常に作成されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "タスクの作成に失敗しました",
        color: "red",
      });
    }
  };

  return (
    <Container size="md" py="xl">
      <Group mb="xl" align="center">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate(`/projects/${projectId}`)}
        >
          戻る
        </Button>
        <Title order={2}>新しいタスク</Title>
      </Group>

      <form onSubmit={handleSubmit}>
        <Stack gap="xl">
          <Card withBorder p="md" radius="md">
            <Stack gap="md">
              <TextInput
                label="タイトル"
                placeholder="タスクのタイトルを入力"
                required
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                styles={(theme) => ({
                  input: {
                    borderLeft: `4px solid ${theme.colors.blue[5]}`,
                    paddingLeft: theme.spacing.sm,
                  },
                })}
              />

              <Textarea
                label="説明"
                placeholder="タスクの詳細な説明を入力"
                minRows={3}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                styles={(theme) => ({
                  input: {
                    borderLeft: `4px solid ${theme.colors.gray[5]}`,
                    paddingLeft: theme.spacing.sm,
                  },
                })}
              />
            </Stack>
          </Card>

          <Grid>
            <Grid.Col span={6}>
              <Card withBorder p="md" radius="md">
                <Stack gap="md">
                  <Select
                    label="ステータス"
                    data={[
                      { value: "planning", label: "未着手" },
                      { value: "in_progress", label: "進行中" },
                      { value: "completed", label: "完了" },
                      { value: "archived", label: "アーカイブ" },
                    ]}
                    value={formData.status}
                    onChange={(value) => handleChange("status", value)}
                    required
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${
                          formData.status === "planning"
                            ? theme.colors.gray[5]
                            : formData.status === "in_progress"
                              ? theme.colors.blue[5]
                              : formData.status === "completed"
                                ? theme.colors.green[5]
                                : theme.colors.gray[5]
                        }`,
                        paddingLeft: theme.spacing.sm,
                      },
                    })}
                  />

                  <Select
                    label="優先度"
                    data={[
                      { value: "low", label: "低" },
                      { value: "medium", label: "中" },
                      { value: "high", label: "高" },
                    ]}
                    value={formData.priority}
                    onChange={(value) => handleChange("priority", value)}
                    required
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${
                          formData.priority === "high"
                            ? theme.colors.red[5]
                            : formData.priority === "medium"
                              ? theme.colors.yellow[5]
                              : theme.colors.green[5]
                        }`,
                        paddingLeft: theme.spacing.sm,
                      },
                    })}
                  />

                  <TextInput
                    label="担当者"
                    placeholder="担当者を入力"
                    value={formData.assigneeId || ""}
                    onChange={(e) => handleChange("assigneeId", e.target.value)}
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${theme.colors.violet[5]}`,
                        paddingLeft: theme.spacing.sm,
                      },
                    })}
                  />
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={6}>
              <Card withBorder p="md" radius="md">
                <Stack gap="md">
                  <DateInput
                    label="期限日"
                    placeholder="期限日を選択"
                    value={formData.dueDate ? new Date(formData.dueDate) : null}
                    onChange={(date) => handleChange("dueDate", date)}
                    clearable
                    valueFormat="YYYY/MM/DD"
                    locale="ja"
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${theme.colors.blue[5]}`,
                        paddingLeft: theme.spacing.sm,
                      },
                      calendarHeader: {
                        backgroundColor: theme.colors.blue[0],
                      },
                      day: {
                        "&[data-selected]": {
                          backgroundColor: theme.colors.blue[5],
                        },
                      },
                    })}
                  />

                  <NumberInput
                    label="進捗率"
                    placeholder="進捗率を入力"
                    min={0}
                    max={100}
                    value={formData.progress}
                    onChange={(value) => handleChange("progress", value)}
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${theme.colors.cyan[5]}`,
                        paddingLeft: theme.spacing.sm,
                      },
                    })}
                  />
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          <Card withBorder p="md" radius="md">
            <MultiSelect
              label="タグ"
              placeholder="タグを選択"
              data={availableTags}
              value={formData.tags || []}
              onChange={(value) => handleChange("tags", value)}
              searchable
              styles={(theme) => ({
                input: {
                  borderLeft: `4px solid ${theme.colors.orange[5]}`,
                  paddingLeft: theme.spacing.sm,
                },
              })}
            />
          </Card>

          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => navigate(`/projects/${projectId}`)}
            >
              キャンセル
            </Button>
            <Button type="submit" color="blue">
              タスクを作成
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default NewTask;
