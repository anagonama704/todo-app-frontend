import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Paper,
  Stack,
  Group,
  Text,
  Badge,
  Button,
  ActionIcon,
  Divider,
  Progress,
  Textarea,
  Grid,
  Card,
  Avatar,
  Menu,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconClock,
  IconUser,
  IconTag,
  IconDots,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { TaskStatus, TaskPriority } from "../../features/tasks/types/task";
import { useTasksStore } from "../../features/tasks/store/tasks";
import { useCommentsStore } from "../../features/tasks/store/comments";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const statusLabels: Record<TaskStatus, string> = {
  planning: "未着手",
  in_progress: "進行中",
  completed: "完了",
  archived: "アーカイブ",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

const priorityColors: Record<TaskPriority, string> = {
  low: "blue",
  medium: "yellow",
  high: "red",
};

export const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, deleteTask } = useTasksStore();
  const {
    comments,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
  } = useCommentsStore();
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, [id, fetchComments]);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <Container size="md" py="xl">
        <Title order={2}>タスクが見つかりません</Title>
        <Button
          leftSection={<IconArrowLeft size={14} />}
          variant="subtle"
          onClick={() => navigate(-1)}
          mt="md"
        >
          戻る
        </Button>
      </Container>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    navigate(-1);
  };

  const handleSubmitComment = async () => {
    if (!id || !newComment.trim()) return;
    try {
      await createComment({
        taskId: id,
        userId: "user1", // TODO: 実際のユーザーIDを使用
        content: newComment,
      });
      setNewComment("");
    } catch (error) {
      console.error("コメントの作成に失敗しました:", error);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      await updateComment(commentId, editingContent);
      setEditingCommentId(null);
    } catch (error) {
      console.error("コメントの更新に失敗しました:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error("コメントの削除に失敗しました:", error);
    }
  };

  return (
    <Container size="md" py="xl">
      <Stack>
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" onClick={() => navigate(-1)} size="lg">
              <IconArrowLeft size={20} />
            </ActionIcon>
            <Title order={2}>{task.title}</Title>
          </Group>
          <Group>
            <Button
              variant="subtle"
              color="red"
              leftSection={<IconTrash size={14} />}
              onClick={handleDelete}
            >
              削除
            </Button>
            <Button variant="subtle" leftSection={<IconEdit size={14} />}>
              編集
            </Button>
          </Group>
        </Group>

        <Paper p="md" withBorder>
          <Stack gap="lg">
            {/* ステータスと優先度 */}
            <Group>
              <Badge size="lg" color={priorityColors[task.priority]}>
                {priorityLabels[task.priority]}
              </Badge>
              <Badge
                size="lg"
                color={
                  task.status === "completed"
                    ? "green"
                    : task.status === "in_progress"
                      ? "blue"
                      : "gray"
                }
              >
                {statusLabels[task.status]}
              </Badge>
            </Group>

            {/* 進捗 */}
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  進捗
                </Text>
                <Text size="sm" fw={500}>
                  {task.progress}%
                </Text>
              </Group>
              <Progress value={task.progress} size="sm" />
            </Stack>

            {/* 説明 */}
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                説明
              </Text>
              <Text size="sm" c="dimmed">
                {task.description || "説明はありません"}
              </Text>
            </Stack>

            <Divider />

            {/* メタ情報 */}
            <Grid>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconClock size={16} />
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      期限
                    </Text>
                    <Text size="sm">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "未設定"}
                    </Text>
                  </Stack>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconUser size={16} />
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      担当者
                    </Text>
                    <Text size="sm">User {task.assigneeId}</Text>
                  </Stack>
                </Group>
              </Grid.Col>
              {task.tags && task.tags.length > 0 && (
                <Grid.Col span={12}>
                  <Group gap="xs">
                    <IconTag size={16} />
                    <Stack gap={0}>
                      <Text size="xs" c="dimmed">
                        タグ
                      </Text>
                      <Group gap="xs">
                        {task.tags.map((tag) => (
                          <Badge key={tag} size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </Group>
                    </Stack>
                  </Group>
                </Grid.Col>
              )}
            </Grid>
          </Stack>
        </Paper>

        {/* コメントセクション */}
        <Paper p="md" withBorder>
          <Stack gap="md">
            <Text size="lg" fw={500}>
              コメント
            </Text>
            <Textarea
              placeholder="コメントを入力..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              minRows={3}
            />
            <Group justify="right">
              <Button onClick={handleSubmitComment}>コメントを投稿</Button>
            </Group>

            <Divider />

            <Stack gap="md">
              {comments.map((comment) => (
                <Card key={comment.id} withBorder>
                  <Stack gap="xs">
                    <Group justify="apart">
                      <Group>
                        <Avatar size="sm" radius="xl">
                          {comment.userId.charAt(0).toUpperCase()}
                        </Avatar>
                        <Text size="sm" fw={500}>
                          {comment.userId}
                        </Text>
                      </Group>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="transparent">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconEdit size={14} />}
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditingContent(comment.content);
                            }}
                          >
                            編集
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            削除
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>

                    {editingCommentId === comment.id ? (
                      <Stack gap="xs">
                        <Textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          minRows={3}
                        />
                        <Group justify="right">
                          <Button
                            variant="default"
                            onClick={() => setEditingCommentId(null)}
                          >
                            キャンセル
                          </Button>
                          <Button
                            onClick={() => handleUpdateComment(comment.id)}
                          >
                            保存
                          </Button>
                        </Group>
                      </Stack>
                    ) : (
                      <Text style={{ whiteSpace: "pre-wrap" }}>
                        {comment.content}
                      </Text>
                    )}

                    <Text size="xs" c="dimmed">
                      {format(
                        new Date(comment.createdAt),
                        "yyyy年MM月dd日 HH:mm",
                        {
                          locale: ja,
                        }
                      )}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};
