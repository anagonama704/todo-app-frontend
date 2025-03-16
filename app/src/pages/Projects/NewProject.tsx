import { useState } from "react";
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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../features/projects/store/projects";
import { CreateProjectInput } from "../../features/projects/types/project";

export function NewProject() {
  const navigate = useNavigate();
  const { createProject, isLoading, error } = useProjectsStore();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject(formData);
    navigate("/projects");
  };

  return (
    <Container size="sm">
      <Title order={1} mb="xl">
        新規プロジェクト
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="プロジェクト名"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.currentTarget.value })
            }
          />

          <Textarea
            label="説明"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
          />

          <Select
            label="ステータス"
            data={[
              { value: "planning", label: "計画中" },
              { value: "in_progress", label: "進行中" },
              { value: "completed", label: "完了" },
              { value: "archived", label: "アーカイブ" },
            ]}
            value={formData.status}
            onChange={(value) =>
              setFormData({
                ...formData,
                status: value as CreateProjectInput["status"],
              })
            }
          />

          <Select
            label="優先度"
            data={[
              { value: "low", label: "低" },
              { value: "medium", label: "中" },
              { value: "high", label: "高" },
            ]}
            value={formData.priority}
            onChange={(value) =>
              setFormData({
                ...formData,
                priority: value as CreateProjectInput["priority"],
              })
            }
          />

          <TextInput
            label="期限"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.currentTarget.value })
            }
          />

          {error && <Text color="red">{error}</Text>}

          <Group justify="flex-end" mt="xl">
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
