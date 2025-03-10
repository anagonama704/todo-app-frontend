import { Title, Container } from "@mantine/core";

export const Important = () => {
  return (
    <Container p="md">
      <Title order={2} size="h3" mb="md">
        重要タスク
      </Title>
      {/* 重要タスクの内容をここに実装 */}
    </Container>
  );
};
