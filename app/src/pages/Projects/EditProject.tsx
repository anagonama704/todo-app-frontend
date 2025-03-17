import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Select,
  Button,
  Stack,
  Group,
  Text,
  Card,
  MultiSelect,
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";
import { useProjectsStore } from "../../features/projects/store/projects";
import { UpdateProjectInput } from "../../features/projects/types/project";
import "@mantine/dates/styles.css";

export function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, isLoading, error } = useProjectsStore();
  const project = projects.find((p) => p.id === id);

  const [formData, setFormData] = useState<UpdateProjectInput>({
    title: "",
    description: "",
    status: "planning",
    priority: "medium",
    dueDate: "",
    ownerId: "",
    members: [],
    tags: [],
  });

  // プロジェクトデータの初期化
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description || "",
        status: project.status,
        priority: project.priority,
        dueDate: project.dueDate || "",
        ownerId: project.ownerId,
        members: project.members || [],
        tags: project.tags || [],
        progress: project.progress,
      });
    }
  }, [project]);

  if (!project || !id) {
    return (
      <Container>
        <Text>プロジェクトが見つかりません</Text>
      </Container>
    );
  }

  const handleChange = (field: keyof UpdateProjectInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProject(id, formData);
      notifications.show({
        title: "プロジェクトを更新しました",
        message: "プロジェクトが正常に更新されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      navigate(`/projects/${id}`);
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "プロジェクトの更新に失敗しました",
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
          onClick={() => navigate(`/projects/${id}`)}
        >
          戻る
        </Button>
        <Title order={2}>プロジェクトを編集</Title>
      </Group>

      <form onSubmit={handleSubmit}>
        <Stack gap="xl">
          <Card withBorder p="md" radius="md">
            <Stack gap="md">
              <TextInput
                label="プロジェクト名"
                placeholder="プロジェクト名を入力"
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
                placeholder="プロジェクトの詳細な説明を入力"
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
                      { value: "planning", label: "計画中" },
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
                            ? theme.colors.blue[5]
                            : formData.status === "in_progress"
                              ? theme.colors.yellow[5]
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
                    label="進捗率 (%)"
                    type="number"
                    min={0}
                    max={100}
                    value={formData.progress?.toString() || "0"}
                    onChange={(e) =>
                      handleChange(
                        "progress",
                        Math.min(
                          100,
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      )
                    }
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

            <Grid.Col span={6}>
              <Card withBorder p="md" radius="md">
                <Stack gap="md">
                  <DateInput
                    label="期限"
                    placeholder="期限を選択"
                    value={formData.dueDate ? new Date(formData.dueDate) : null}
                    onChange={(date) =>
                      handleChange(
                        "dueDate",
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
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

                  <MultiSelect
                    label="タグ"
                    placeholder="タグを選択または入力"
                    data={formData.tags || []}
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

                  <MultiSelect
                    label="メンバー"
                    placeholder="メンバーを選択"
                    data={[
                      { value: "user1", label: "ユーザー1" },
                      { value: "user2", label: "ユーザー2" },
                      { value: "user3", label: "ユーザー3" },
                    ]}
                    value={formData.members || []}
                    onChange={(value) => handleChange("members", value)}
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
          </Grid>

          {error && <Text color="red">{error}</Text>}

          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => navigate(`/projects/${id}`)}
            >
              キャンセル
            </Button>
            <Button type="submit" loading={isLoading}>
              更新
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
