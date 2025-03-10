import { Title, Container } from "@mantine/core";

export const Completed = () => {
  return (
    <Container p="md">
      <Title order={2} size="h3" mb="md">
        完了済み
      </Title>
      {/* 完了済みタスクの内容をここに実装 */}
    </Container>
  );
};
