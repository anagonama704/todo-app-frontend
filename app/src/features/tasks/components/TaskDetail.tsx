import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTasksStore } from "../store/tasks";
import { useCommentsStore } from "../store/comments";
import {
  Card,
  Text,
  Group,
  Stack,
  Textarea,
  Button,
  Divider,
  Avatar,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks, fetchTasks } = useTasksStore();
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
    fetchTasks();
    if (taskId) {
      fetchComments(taskId);
    }
  }, [taskId, fetchTasks, fetchComments]);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <Text>タスクが見つかりません</Text>;
  }

  const handleSubmitComment = async () => {
    if (!taskId || !newComment.trim()) return;
    try {
      await createComment({
        taskId,
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
    <Stack gap="md">
      <Card withBorder>
        <Stack gap="md">
          <Text size="xl" fw={700}>
            {task.title}
          </Text>
          <Text>{task.description}</Text>
          <Group>
            <Text size="sm" color="dimmed">
              期限:{" "}
              {task.dueDate &&
                format(new Date(task.dueDate), "yyyy年MM月dd日", {
                  locale: ja,
                })}
            </Text>
            <Text size="sm" color="dimmed">
              ステータス: {task.status}
            </Text>
          </Group>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="md">
          <Text size="lg" fw={700}>
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
                        <Button onClick={() => handleUpdateComment(comment.id)}>
                          保存
                        </Button>
                      </Group>
                    </Stack>
                  ) : (
                    <Text style={{ whiteSpace: "pre-wrap" }}>
                      {comment.content}
                    </Text>
                  )}

                  <Text size="xs" color="dimmed">
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
      </Card>
    </Stack>
  );
};
