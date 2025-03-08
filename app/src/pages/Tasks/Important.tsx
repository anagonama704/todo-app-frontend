import { Title, Paper } from "@mantine/core";

export const Important = () => {
  return (
    <Paper p="md" radius="sm">
      <Title order={2} size="h3" mb="md">
        重要タスク
      </Title>
      {/* 重要タスクの内容をここに実装 */}
    </Paper>
  );
};
