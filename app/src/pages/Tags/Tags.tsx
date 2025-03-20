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
  ActionIcon,
  Menu,
  TextInput,
  ColorInput,
  Modal,
  ThemeIcon,
  Divider,
  Box,
  Center,
  Paper,
  Loader,
  Alert,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconCheck,
  IconX,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useTagsStore } from "../../features/tags/store/tags";
import { Tag, CreateTagInput } from "../../features/tags/types/tag";
import { notifications } from "@mantine/notifications";

export function Tags() {
  const { tags, isLoading, error, fetchTags, createTag, updateTag, deleteTag } =
    useTagsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [formData, setFormData] = useState<CreateTagInput>({
    name: "",
    color: "#228be6",
  });

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedTag) {
        await updateTag(selectedTag.id, formData);
        notifications.show({
          title: "タグを更新しました",
          message: "タグが正常に更新されました",
          color: "green",
          icon: <IconCheck size={16} />,
        });
      } else {
        await createTag(formData);
        notifications.show({
          title: "タグを作成しました",
          message: "タグが正常に作成されました",
          color: "green",
          icon: <IconCheck size={16} />,
        });
      }
      setIsModalOpen(false);
      setSelectedTag(null);
      setFormData({ name: "", color: "#228be6" });
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "タグの保存に失敗しました",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedTag) return;
    try {
      await deleteTag(selectedTag.id);
      notifications.show({
        title: "タグを削除しました",
        message: "タグが正常に削除されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      setIsDeleteModalOpen(false);
      setSelectedTag(null);
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "タグの削除に失敗しました",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setFormData({ name: tag.name, color: tag.color });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="sm">
        <Alert color="red" title="エラー" icon={<IconX size={16} />}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Stack gap={4}>
            <Title order={1} size="h2" fw={700}>
              タグ
            </Title>
            <Text size="sm" c="dimmed">
              タグの一覧を表示・管理します
            </Text>
          </Stack>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              setSelectedTag(null);
              setFormData({ name: "", color: "#228be6" });
              setIsModalOpen(true);
            }}
          >
            新規タグ
          </Button>
        </Group>

        <Grid>
          {tags.map((tag) => (
            <Grid.Col key={tag.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Badge color={tag.color}>{tag.name}</Badge>
                  <Menu position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit size={14} />}
                        onClick={() => handleEdit(tag)}
                      >
                        編集
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash size={14} />}
                        color="red"
                        onClick={() => {
                          setSelectedTag(tag);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        削除
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Text size="sm" c="dimmed">
                  作成日: {new Date(tag.createdAt).toLocaleDateString()}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      {/* タグ作成・編集モーダル */}
      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTag(null);
          setFormData({ name: "", color: "#228be6" });
        }}
        title={selectedTag ? "タグの編集" : "新規タグ"}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="タグ名"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.currentTarget.value })
              }
            />
            <ColorInput
              label="色"
              value={formData.color}
              onChange={(color) => setFormData({ ...formData, color })}
            />
            <Group justify="flex-end" mt="xl">
              <Button
                variant="subtle"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedTag(null);
                  setFormData({ name: "", color: "#228be6" });
                }}
              >
                キャンセル
              </Button>
              <Button type="submit" loading={isLoading}>
                {selectedTag ? "更新" : "作成"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* 削除確認モーダル */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="タグの削除"
        centered
        size="md"
      >
        <Stack gap="md">
          <Group gap="xs">
            <ThemeIcon color="red" size="lg" radius="xl">
              <IconAlertTriangle size={20} />
            </ThemeIcon>
            <Text fw={500} size="lg">
              このタグを削除しますか？
            </Text>
          </Group>

          <Text color="dimmed">
            この操作は取り消せません。タグ「{selectedTag?.name}
            」が完全に削除されます。
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
    </Container>
  );
}
