import { Title, Paper } from "@mantine/core";

export const Dashboard = () => {
  return (
    <Paper p="md" radius="sm">
      <Title order={2} size="h3" mb="md">
        ダッシュボード
      </Title>
      {/* ダッシュボードの内容をここに実装 */}
    </Paper>
  );
};
