import { Title, Paper } from "@mantine/core";

export const Overdue = () => {
  return (
    <Paper p="md" radius="sm">
      <Title order={2} size="h3" mb="md">
        期限切れ
      </Title>
      {/* 期限切れタスクの内容をここに実装 */}
    </Paper>
  );
};
