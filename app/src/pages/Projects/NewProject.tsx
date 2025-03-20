import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useTagsStore } from "../../features/tags/store/tags";
import { CreateProjectInput } from "../../features/projects/types/project";
import "@mantine/dates/styles.css";

export function NewProject() {
  const navigate = useNavigate();
  const { createProject, isLoading, error } = useProjectsStore();
  const { tags, fetchTags } = useTagsStore();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const [formData, setFormData] = useState<CreateProjectInput>({
    title: "",
    description: "",
    status: "planning",
    priority: "medium",
    dueDate: "",
    ownerId: "user1", // TODO: 実際のユーザーIDを使用
    members: [],
    tags: [],
  });

  const handleChange = (field: keyof CreateProjectInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProject(formData);
      notifications.show({
        title: "プロジェクトを作成しました",
        message: "プロジェクトが正常に作成されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      navigate("/projects");
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "プロジェクトの作成に失敗しました",
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
          onClick={() => navigate("/projects")}
        >
          戻る
        </Button>
        <Title order={2}>新規プロジェクト</Title>
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
                    value="0"
                    disabled
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
                    label="期限日"
                    placeholder="期限日を選択"
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
                    })}
                  />

                  <MultiSelect
                    label="タグ"
                    placeholder="タグを選択"
                    data={tags.map((tag) => ({
                      value: tag.id,
                      label: tag.name,
                      color: tag.color,
                    }))}
                    value={formData.tags}
                    onChange={(value) => handleChange("tags", value)}
                    searchable
                    clearable
                    styles={(theme) => ({
                      input: {
                        borderLeft: `4px solid ${theme.colors.grape[5]}`,
                        paddingLeft: theme.spacing.sm,
                      },
                    })}
                  />
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}

          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => navigate("/projects")}>
              キャンセル
            </Button>
            <Button type="submit" loading={isLoading}>
              作成
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
