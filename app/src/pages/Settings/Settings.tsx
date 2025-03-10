import {
  Container,
  Paper,
  Title,
  Stack,
  Text,
  Switch,
  Group,
  Divider,
  Button,
  TextInput,
  Select,
  ColorInput,
} from "@mantine/core";
import { useAuthStore } from "../../features/auth/store/auth";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const Settings = () => {
  const { user, updateSettings } = useAuthStore();
  const [settings, setSettings] = useState({
    theme: "light",
    primaryColor: "#59B5F8",
    notifications: true,
    language: "ja",
  });

  const handleSave = async () => {
    try {
      await updateSettings(settings);
      notifications.show({
        title: "設定を保存しました",
        message: "変更が正常に保存されました",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      notifications.show({
        title: "エラーが発生しました",
        message: "設定の保存に失敗しました",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  if (!user) {
    return <Text>ユーザー情報が見つかりません</Text>;
  }

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="xl">
        設定
      </Title>

      <Stack gap="xl">
        {/* 表示設定 */}
        <Stack gap="md">
          <Title order={3} size="h4">
            表示設定
          </Title>
          <Group justify="space-between">
            <Stack gap={4}>
              <Text>ダークモード</Text>
              <Text size="sm" c="dimmed">
                ダークテーマに切り替えます
              </Text>
            </Stack>
            <Switch
              checked={settings.theme === "dark"}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  theme: event.currentTarget.checked ? "dark" : "light",
                })
              }
            />
          </Group>

          <Group justify="space-between">
            <Stack gap={4}>
              <Text>プライマリーカラー</Text>
              <Text size="sm" c="dimmed">
                アプリケーションのメインカラーを設定します
              </Text>
            </Stack>
            <ColorInput
              value={settings.primaryColor}
              onChange={(value) =>
                setSettings({ ...settings, primaryColor: value || "#59B5F8" })
              }
            />
          </Group>
        </Stack>

        <Divider />

        {/* 通知設定 */}
        <Stack gap="md">
          <Title order={3} size="h4">
            通知設定
          </Title>
          <Group justify="space-between">
            <Stack gap={4}>
              <Text>プッシュ通知</Text>
              <Text size="sm" c="dimmed">
                ブラウザのプッシュ通知を有効にします
              </Text>
            </Stack>
            <Switch
              checked={settings.notifications}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  notifications: event.currentTarget.checked,
                })
              }
            />
          </Group>
        </Stack>

        <Divider />

        {/* 言語設定 */}
        <Stack gap="md">
          <Title order={3} size="h4">
            言語設定
          </Title>
          <Group justify="space-between">
            <Stack gap={4}>
              <Text>表示言語</Text>
              <Text size="sm" c="dimmed">
                アプリケーションの表示言語を設定します
              </Text>
            </Stack>
            <Select
              value={settings.language}
              onChange={(value) =>
                setSettings({ ...settings, language: value || "ja" })
              }
              data={[
                { value: "ja", label: "日本語" },
                { value: "en", label: "English" },
              ]}
            />
          </Group>
        </Stack>

        <Divider />

        {/* アカウント設定 */}
        <Stack gap="md">
          <Title order={3} size="h4">
            アカウント設定
          </Title>
          <Group justify="space-between">
            <Stack gap={4}>
              <Text>メールアドレス</Text>
              <Text size="sm" c="dimmed">
                アカウントのメールアドレスを変更します
              </Text>
            </Stack>
            <TextInput value={user.email} readOnly style={{ width: 200 }} />
          </Group>
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button onClick={handleSave}>設定を保存</Button>
        </Group>
      </Stack>
    </Container>
  );
};
