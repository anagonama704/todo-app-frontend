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
  Badge,
  Timeline,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconClock,
} from "@tabler/icons-react";

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

  // 週の最初の日（日曜日）を取得
  const getFirstDayOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  };

  // 週の最後の日（土曜日）を取得
  const getLastDayOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() + (6 - day));
    return d;
  };

  // 日付が今日かどうかをチェック
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // カレンダーグリッドの日付を生成（月表示用）
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

  // 週表示用の日付を生成
  const generateWeekDays = () => {
    const firstDay = getFirstDayOfWeek(selectedDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDay);
      currentDate.setDate(firstDay.getDate() + i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    return days;
  };

  // 前へ移動
  const goToPrevious = () => {
    if (currentView === "month") {
      setSelectedDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
      );
    } else if (currentView === "week") {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 7);
      setSelectedDate(newDate);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(newDate);
    }
  };

  // 次へ移動
  const goToNext = () => {
    if (currentView === "month") {
      setSelectedDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
      );
    } else if (currentView === "week") {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 7);
      setSelectedDate(newDate);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(newDate);
    }
  };

  // 今日へ移動
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // 日付のフォーマット
  const formatDate = () => {
    if (currentView === "month") {
      return `${selectedDate.getFullYear()}年 ${selectedDate.getMonth() + 1}月`;
    } else if (currentView === "week") {
      const firstDay = getFirstDayOfWeek(selectedDate);
      const lastDay = getLastDayOfWeek(selectedDate);
      return `${firstDay.getFullYear()}年 ${firstDay.getMonth() + 1}月${firstDay.getDate()}日 - ${lastDay.getMonth() + 1}月${lastDay.getDate()}日`;
    } else {
      return `${selectedDate.getFullYear()}年 ${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`;
    }
  };

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const calendarDays =
    currentView === "month" ? generateCalendarDays() : generateWeekDays();

  // 時間スロットを生成
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const renderDateCell = (day: { date: Date; isCurrentMonth: boolean }) => (
    <Box
      p="xs"
      style={{
        minHeight: currentView === "month" ? "100px" : "auto",
        borderRight: "1px solid var(--mantine-color-gray-2)",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        backgroundColor: day.isCurrentMonth
          ? undefined
          : "var(--mantine-color-gray-0)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isToday(day.date) ? (
        <Badge
          size="lg"
          radius="xl"
          variant="filled"
          color="blue"
          style={{
            width: "32px",
            height: "32px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {day.date.getDate()}
        </Badge>
      ) : (
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
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {day.date.getDate()}
        </Text>
      )}
    </Box>
  );

  const renderMonthView = () => (
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
          {renderDateCell(day)}
        </Grid.Col>
      ))}
    </Grid>
  );

  const renderWeekView = () => (
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

      {/* 日付ヘッダー */}
      {calendarDays.map((day, index) => (
        <Grid.Col span={1} key={index}>
          {renderDateCell(day)}
        </Grid.Col>
      ))}

      {/* 時間スロット */}
      <Grid.Col span={7}>
        <Grid columns={7} gutter={0}>
          {timeSlots.map((time) => (
            <>
              {Array.from({ length: 7 }).map((_, index) => (
                <Grid.Col span={1} key={`${time}-${index}`}>
                  <Box
                    p="xs"
                    style={{
                      minHeight: "60px",
                      borderRight: "1px solid var(--mantine-color-gray-2)",
                      borderBottom: "1px solid var(--mantine-color-gray-2)",
                    }}
                  >
                    {index === 0 && (
                      <Text size="xs" c="dimmed">
                        {time}
                      </Text>
                    )}
                  </Box>
                </Grid.Col>
              ))}
            </>
          ))}
        </Grid>
      </Grid.Col>
    </Grid>
  );

  const renderDayView = () => (
    <Stack>
      {/* 日付ヘッダー */}
      <Box
        p="xs"
        style={{
          textAlign: "center",
          borderBottom: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        <Text
          fw={500}
          c={
            selectedDate.getDay() === 0
              ? "red"
              : selectedDate.getDay() === 6
                ? "blue"
                : "inherit"
          }
        >
          {weekDays[selectedDate.getDay()]}
        </Text>
        {renderDateCell({ date: selectedDate, isCurrentMonth: true })}
      </Box>

      {/* 時間スロット */}
      <Timeline active={-1} bulletSize={24}>
        {timeSlots.map((time) => (
          <Timeline.Item
            key={time}
            bullet={<IconClock size={12} />}
            title={time}
          >
            <Box
              style={{
                minHeight: "60px",
                borderBottom: "1px solid var(--mantine-color-gray-2)",
              }}
            />
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  );

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
            <ActionIcon variant="subtle" onClick={goToPrevious}>
              <IconChevronLeft size={20} />
            </ActionIcon>
            <Text fw={500}>{formatDate()}</Text>
            <ActionIcon variant="subtle" onClick={goToNext}>
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

        {/* カレンダー表示 */}
        <Paper shadow="xs" radius="sm" p="md">
          {currentView === "month" && renderMonthView()}
          {currentView === "week" && renderWeekView()}
          {currentView === "day" && renderDayView()}
        </Paper>
      </Stack>
    </Container>
  );
};
