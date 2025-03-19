import { Stack, Text, Group, Badge, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconClock } from "@tabler/icons-react";
import { Task } from "../types/task";

interface OverdueTasksProps {
  tasks: Task[];
}

const priorityColors = {
  low: "blue",
  medium: "yellow",
  high: "red",
} as const;

export const OverdueTasks = ({ tasks }: OverdueTasksProps) => {
  if (tasks.length === 0) {
    return (
      <Text size="sm" c="dimmed" ta="center" py="md">
        期限切れのタスクはありません
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      {tasks.map((task) => (
        <Group key={task.id} justify="space-between" wrap="nowrap">
          <Group gap="xs" wrap="nowrap">
            <Badge color={priorityColors[task.priority]} size="sm">
              {task.priority === "high"
                ? "高"
                : task.priority === "medium"
                  ? "中"
                  : "低"}
            </Badge>
            <Text size="sm" lineClamp={1}>
              {task.title}
            </Text>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <Tooltip label="期限日">
              <Group gap={4} wrap="nowrap">
                <IconClock size={14} />
                <Text size="xs" c="red">
                  {new Date(task.dueDate!).toLocaleDateString()}
                </Text>
              </Group>
            </Tooltip>
            <Tooltip label="完了する">
              <ActionIcon variant="subtle" color="green" size="sm">
                <IconCheck size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      ))}
    </Stack>
  );
};
