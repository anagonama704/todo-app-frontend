import { Title, Container } from "@mantine/core";

export const Overdue = () => {
  return (
    <Container p="md">
      <Title order={2} size="h3" mb="md">
        期限切れ
      </Title>
      {/* 期限切れタスクの内容をここに実装 */}
    </Container>
  );
};
