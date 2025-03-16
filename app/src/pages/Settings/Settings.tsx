import {
  Container,
  Title,
  Stack,
  Card,
  Group,
  ThemeIcon,
  Text,
  Switch,
  Select,
  NumberInput,
  rem,
} from "@mantine/core";
import { IconPalette, IconBell, IconChecklist } from "@tabler/icons-react";
import { useSettingsStore } from "../../features/settings/store/settings";

export const Settings = () => {
  const settings = useSettingsStore();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>設定</Title>

        <Card withBorder radius="md" p="xl">
          <Stack gap="lg">
            <Group>
              <ThemeIcon size={32} radius="md" variant="light" color="blue">
                <IconPalette size={18} />
              </ThemeIcon>
              <Title order={3}>表示設定</Title>
            </Group>

            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text fw={500}>フォントサイズ</Text>
                  <Text size="sm" c="dimmed">
                    テキストの表示サイズを設定します
                  </Text>
                </div>
                <Select
                  w={rem(100)}
                  value={settings.fontSize}
                  onChange={(value) =>
                    settings.updateSettings({
                      fontSize: value as "sm" | "md" | "lg",
                    })
                  }
                  data={[
                    { value: "sm", label: "小" },
                    { value: "md", label: "中" },
                    { value: "lg", label: "大" },
                  ]}
                />
              </Group>
            </Stack>
          </Stack>
        </Card>

        <Card withBorder radius="md" p="xl">
          <Stack gap="lg">
            <Group>
              <ThemeIcon size={32} radius="md" variant="light" color="grape">
                <IconBell size={18} />
              </ThemeIcon>
              <Title order={3}>通知設定</Title>
            </Group>

            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text fw={500}>メール通知</Text>
                  <Text size="sm" c="dimmed">
                    メールで通知を受け取ります
                  </Text>
                </div>
                <Switch
                  checked={settings.enableEmailNotifications}
                  onChange={(event) =>
                    settings.updateSettings({
                      enableEmailNotifications: event.currentTarget.checked,
                    })
                  }
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text fw={500}>プッシュ通知</Text>
                  <Text size="sm" c="dimmed">
                    ブラウザのプッシュ通知を使用します
                  </Text>
                </div>
                <Switch
                  checked={settings.enablePushNotifications}
                  onChange={(event) =>
                    settings.updateSettings({
                      enablePushNotifications: event.currentTarget.checked,
                    })
                  }
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text fw={500}>期限前の通知</Text>
                  <Text size="sm" c="dimmed">
                    タスクの期限が近づいたら通知します
                  </Text>
                </div>
                <Switch
                  checked={settings.notifyBeforeDeadline}
                  onChange={(event) =>
                    settings.updateSettings({
                      notifyBeforeDeadline: event.currentTarget.checked,
                    })
                  }
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text fw={500}>通知タイミング</Text>
                  <Text size="sm" c="dimmed">
                    期限の何時間前に通知するか設定します
                  </Text>
                </div>
                <NumberInput
                  w={rem(100)}
                  value={settings.deadlineNotificationTime}
                  onChange={(value) =>
                    settings.updateSettings({
                      deadlineNotificationTime: value as number,
                    })
                  }
                  min={1}
                  max={72}
                  step={1}
                  suffix="時間前"
                />
              </Group>
            </Stack>
          </Stack>
        </Card>

        <Card withBorder radius="md" p="xl">
          <Stack gap="lg">
            <Group>
              <ThemeIcon size={32} radius="md" variant="light" color="teal">
                <IconChecklist size={18} />
              </ThemeIcon>
              <Title order={3}>タスク設定</Title>
            </Group>

            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text fw={500}>デフォルトの優先度</Text>
                  <Text size="sm" c="dimmed">
                    新規タスク作成時の優先度を設定します
                  </Text>
                </div>
                <Select
                  w={rem(100)}
                  value={settings.defaultPriority}
                  onChange={(value) =>
                    settings.updateSettings({
                      defaultPriority: value as "low" | "medium" | "high",
                    })
                  }
                  data={[
                    { value: "low", label: "低" },
                    { value: "medium", label: "中" },
                    { value: "high", label: "高" },
                  ]}
                />
              </Group>

              <Group justify="space-between">
                <div>
                  <Text fw={500}>完了タスクの表示</Text>
                  <Text size="sm" c="dimmed">
                    完了したタスクをリストに表示します
                  </Text>
                </div>
                <Switch
                  checked={settings.showCompletedTasks}
                  onChange={(event) =>
                    settings.updateSettings({
                      showCompletedTasks: event.currentTarget.checked,
                    })
                  }
                />
              </Group>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
