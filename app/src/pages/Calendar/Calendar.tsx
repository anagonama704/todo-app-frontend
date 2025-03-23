import { useState } from "react";
import {
  Title,
  Container,
  Grid,
  Paper,
  Text,
  Group,
  Button,
  ActionIcon,
  Select,
  Box,
  Stack,
  Flex,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type ViewType = "month" | "week" | "day";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>("month");

  // 月の最初の日を取得
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // 月の最後の日を取得
  const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // カレンダーグリッドの日付を生成
  const generateCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(selectedDate);
    const lastDay = getLastDayOfMonth(selectedDate);
    const days = [];

    // 前月の日付を追加
    const startPadding = firstDay.getDay();
    for (let i = startPadding - 1; i >= 0; i--) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(prevDate.getDate() - (i + 1));
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // 現在の月の日付を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    // 次月の日付を追加
    const endPadding = 42 - days.length; // 6週間分のグリッド (6 * 7 = 42)
    for (let i = 1; i <= endPadding; i++) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(nextDate.getDate() + i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  // 前の月へ移動
  const goToPreviousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
  };

  // 次の月へ移動
  const goToNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  };

  // 今日へ移動
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const calendarDays = generateCalendarDays();

  return (
    <Container size="xl" p="md">
      <Stack>
        {/* ヘッダー部分 */}
        <Flex justify="space-between" align="center">
          <Group>
            <Title order={2} size="h3">
              カレンダー
            </Title>
            <Button variant="light" onClick={goToToday}>
              今日
            </Button>
          </Group>
          <Group>
            <ActionIcon variant="subtle" onClick={goToPreviousMonth}>
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Text fw={500}>
              {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月
            </Text>
            <ActionIcon variant="subtle" onClick={goToNextMonth}>
              <IconChevronRight size={20} />
            </ActionIcon>
          </Group>
          <Select
            value={currentView}
            onChange={(value) => value && setCurrentView(value as ViewType)}
            data={[
              { value: "month", label: "月" },
              { value: "week", label: "週" },
              { value: "day", label: "日" },
            ]}
            w={100}
          />
        </Flex>

        {/* カレンダーグリッド */}
        <Paper shadow="xs" radius="sm" p="md">
          <Grid columns={7} gutter={0}>
            {/* 曜日のヘッダー */}
            {weekDays.map((day, index) => (
              <Grid.Col span={1} key={index}>
                <Box
                  p="xs"
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid var(--mantine-color-gray-3)",
                  }}
                >
                  <Text
                    fw={500}
                    c={index === 0 ? "red" : index === 6 ? "blue" : "inherit"}
                  >
                    {day}
                  </Text>
                </Box>
              </Grid.Col>
            ))}

            {/* 日付グリッド */}
            {calendarDays.map((day, index) => (
              <Grid.Col span={1} key={index}>
                <Box
                  p="xs"
                  style={{
                    minHeight: "100px",
                    borderRight: "1px solid var(--mantine-color-gray-2)",
                    borderBottom: "1px solid var(--mantine-color-gray-2)",
                    backgroundColor: day.isCurrentMonth
                      ? undefined
                      : "var(--mantine-color-gray-0)",
                  }}
                >
                  <Text
                    size="sm"
                    c={
                      !day.isCurrentMonth
                        ? "dimmed"
                        : day.date.getDay() === 0
                          ? "red"
                          : day.date.getDay() === 6
                            ? "blue"
                            : undefined
                    }
                  >
                    {day.date.getDate()}
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
};
