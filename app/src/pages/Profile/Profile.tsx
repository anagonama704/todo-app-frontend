import {
  Paper,
  Avatar,
  Stack,
  Text,
  Group,
  Divider,
  Box,
  Container,
  Grid,
  Card,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Textarea,
  Title,
} from "@mantine/core";
import { useAuthStore } from "../../features/auth/store/auth";
import {
  IconEdit,
  IconMail,
  IconCalendar,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";

export const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    displayName: user?.displayName || "",
    email: user?.email || "",
  });

  const handleEditSubmit = async () => {
    try {
      await updateProfile(editForm);
      setIsEditModalOpen(false);
      // 通知は一時的に無効化
    } catch (error) {
      console.error("プロフィールの更新に失敗しました:", error);
    }
  };

  if (!user) {
    return <Text>ユーザー情報が見つかりません</Text>;
  }

  return (
    <Container size="md" p="xl">
      <Paper shadow="xs" radius="md" p="xl">
        <Stack align="center" gap="xl">
          {/* プロフィールヘッダー */}
          <Box pos="relative">
            <Avatar
              size={120}
              radius="xl"
              src={null}
              color="#59B5F8"
              style={{ border: "4px solid #59B5F8" }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <ActionIcon
              variant="filled"
              color="#59B5F8"
              size="lg"
              radius="xl"
              pos="absolute"
              bottom={0}
              right={0}
              onClick={() => setIsEditModalOpen(true)}
            >
              <IconEdit size={20} />
            </ActionIcon>
          </Box>

          {/* ユーザー情報 */}
          <Stack align="center" gap="xs">
            <Text size="xl" fw={700}>
              {user?.name}
            </Text>
            <Badge color="#59B5F8" variant="light">
              {user?.displayName || "表示名未設定"}
            </Badge>
          </Stack>

          <Divider w="100%" />

          {/* プロフィール情報 */}
          <Grid w="100%" gutter="md">
            <Grid.Col span={12}>
              <Card withBorder radius="md" p="md">
                <Stack gap="md">
                  <Group>
                    <IconMail size={20} color="#59B5F8" />
                    <Box>
                      <Text size="sm" c="dimmed">
                        メールアドレス
                      </Text>
                      <Text>{user?.email}</Text>
                    </Box>
                  </Group>

                  <Group>
                    <IconCalendar size={20} color="#59B5F8" />
                    <Box>
                      <Text size="sm" c="dimmed">
                        アカウント作成日
                      </Text>
                      <Text>
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("ja-JP")
                          : "未設定"}
                      </Text>
                    </Box>
                  </Group>

                  <Group>
                    <IconUser size={20} color="#59B5F8" />
                    <Box>
                      <Text size="sm" c="dimmed">
                        最終更新
                      </Text>
                      <Text>
                        {user?.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString("ja-JP")
                          : "未設定"}
                      </Text>
                    </Box>
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      {/* 編集モーダル */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="プロフィール編集"
        size="md"
      >
        <Stack gap="md">
          <TextInput
            label="ユーザー名"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.currentTarget.value })
            }
          />
          <TextInput
            label="表示名"
            value={editForm.displayName}
            onChange={(e) =>
              setEditForm({ ...editForm, displayName: e.currentTarget.value })
            }
          />
          <TextInput
            label="メールアドレス"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.currentTarget.value })
            }
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setIsEditModalOpen(false)}>
              キャンセル
            </Button>
            <Button color="#59B5F8" onClick={handleEditSubmit}>
              保存
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
