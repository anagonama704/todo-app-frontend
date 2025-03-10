import { Title, Container } from "@mantine/core";

export const Today = () => {
  return (
    <Container p="md">
      <Title order={2} size="h3" mb="md">
        今日のタスク
      </Title>
      {/* 今日のタスクの内容をここに実装 */}
    </Container>
  );
};
