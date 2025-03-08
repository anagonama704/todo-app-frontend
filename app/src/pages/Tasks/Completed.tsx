import { Title, Paper } from "@mantine/core";

export const Completed = () => {
  return (
    <Paper p="md" radius="sm">
      <Title order={2} size="h3" mb="md">
        完了済み
      </Title>
      {/* 完了済みタスクの内容をここに実装 */}
    </Paper>
  );
};
