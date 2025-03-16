import {
  Container,
  Title,
  Text,
  Stack,
  List,
  ThemeIcon,
  Group,
  rem,
  Badge,
  Card,
} from "@mantine/core";
import {
  IconCheck,
  IconQuestionMark,
  IconBook,
  IconClipboardList,
  IconFolder,
  IconCalendar,
  IconHelp,
  IconMail,
} from "@tabler/icons-react";

export const Help = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Stack gap="md">
          <Group>
            <ThemeIcon size={50} radius="md" variant="light" color="blue">
              <IconBook size={30} />
            </ThemeIcon>
            <div>
              <Title order={1}>ヘルプセンター</Title>
              <Text size="lg" c="dimmed">
                よくある質問や使い方について説明します
              </Text>
            </div>
          </Group>
          <Text size="sm" c="dimmed">
            アプリケーションの使い方や機能について、カテゴリーごとに詳しく説明しています。
            お探しの情報が見つからない場合は、お問い合わせフォームからご連絡ください。
          </Text>
        </Stack>

        <Stack gap="lg">
          <Card withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={24} radius="md" variant="light" color="blue">
                  <IconBook size={16} />
                </ThemeIcon>
                <Title order={3}>はじめに</Title>
              </Group>
              <Text>
                このアプリケーションは、タスク管理とプロジェクト管理を効率的に行うためのツールです。
                以下の機能を提供しています：
              </Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>タスクの作成と管理</List.Item>
                <List.Item>プロジェクトの整理</List.Item>
                <List.Item>カレンダーでのスケジュール管理</List.Item>
                <List.Item>タグによる分類</List.Item>
                <List.Item>レポートと分析</List.Item>
              </List>
            </Stack>
          </Card>

          <Card withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={24} radius="md" variant="light" color="violet">
                  <IconClipboardList size={16} />
                </ThemeIcon>
                <Title order={3}>タスクの管理</Title>
              </Group>
              <Text>タスクの作成と管理について説明します：</Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>新しいタスクの作成</List.Item>
                <List.Item>タスクの編集と削除</List.Item>
                <List.Item>タスクの優先順位設定</List.Item>
                <List.Item>タスクの期限設定</List.Item>
                <List.Item>タスクの完了マーク</List.Item>
              </List>
            </Stack>
          </Card>

          <Card withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={24} radius="md" variant="light" color="grape">
                  <IconFolder size={16} />
                </ThemeIcon>
                <Title order={3}>プロジェクトの管理</Title>
              </Group>
              <Text>プロジェクトの作成と管理について説明します：</Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>新しいプロジェクトの作成</List.Item>
                <List.Item>プロジェクトの編集と削除</List.Item>
                <List.Item>プロジェクトへのタスクの追加</List.Item>
                <List.Item>プロジェクトの進捗管理</List.Item>
                <List.Item>プロジェクトメンバーの管理</List.Item>
              </List>
            </Stack>
          </Card>

          <Card withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={24} radius="md" variant="light" color="pink">
                  <IconCalendar size={16} />
                </ThemeIcon>
                <Title order={3}>カレンダーの使い方</Title>
              </Group>
              <Text>カレンダー機能について説明します：</Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>カレンダーでのタスク表示</List.Item>
                <List.Item>タスクの期限設定</List.Item>
                <List.Item>カレンダーの表示期間の変更</List.Item>
                <List.Item>タスクのドラッグ＆ドロップによる日付変更</List.Item>
              </List>
            </Stack>
          </Card>

          <Card withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={24} radius="md" variant="light" color="orange">
                  <IconHelp size={16} />
                </ThemeIcon>
                <Title order={3}>よくある質問</Title>
              </Group>
              <Stack gap="md">
                <div>
                  <Group gap="xs" mb="xs">
                    <Badge variant="light" color="orange">
                      Q
                    </Badge>
                    <Text fw={500}>タスクの期限を変更するには？</Text>
                  </Group>
                  <Text size="sm" c="dimmed" ml={rem(32)}>
                    カレンダー画面でタスクをドラッグ＆ドロップするか、タスクの編集画面から期限を変更できます。
                  </Text>
                </div>
                <div>
                  <Group gap="xs" mb="xs">
                    <Badge variant="light" color="orange">
                      Q
                    </Badge>
                    <Text fw={500}>プロジェクトにメンバーを追加するには？</Text>
                  </Group>
                  <Text size="sm" c="dimmed" ml={rem(32)}>
                    プロジェクトの設定画面から、メンバーの追加と削除が可能です。
                  </Text>
                </div>
                <div>
                  <Group gap="xs" mb="xs">
                    <Badge variant="light" color="orange">
                      Q
                    </Badge>
                    <Text fw={500}>
                      タスクの優先順位はどのように設定されますか？
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed" ml={rem(32)}>
                    タスクの編集画面で、優先順位（高・中・低）を選択できます。
                  </Text>
                </div>
              </Stack>
            </Stack>
          </Card>

          <Card withBorder radius="md" p="xl">
            <Stack gap="md">
              <Group>
                <ThemeIcon size={24} radius="md" variant="light" color="green">
                  <IconMail size={16} />
                </ThemeIcon>
                <Title order={3}>お問い合わせ</Title>
              </Group>
              <Text>
                ご不明な点がございましたら、以下の方法でお問い合わせください：
              </Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconQuestionMark size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>サポートメール: support@example.com</List.Item>
                <List.Item>お問い合わせフォーム: /contact</List.Item>
                <List.Item>FAQページ: /faq</List.Item>
              </List>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
};
