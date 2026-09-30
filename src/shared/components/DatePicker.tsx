import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Pressable, ScrollView, View, Text } from "react-native";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import useTheme from "@/common/hooks/useTheme";

type Props = {
  date: DateType;
  setDate: (e: DateType) => void;
  mode?: "single" | "range";
  startDate?: DateType;
  endDate?: DateType;
  setRangeDate?: (e: { startDate: DateType; endDate: DateType }) => void;
  allowRangeReset?: boolean;
  type?: "day" | "time" | "month";
  minDate?: DateType;
  maxDate?: DateType;
  showMonthScroller?: boolean;
};

type DatePickerChange = {
  date?: DateType;
  startDate?: DateType;
  endDate?: DateType;
};

const DEFAULT_MONTHS_TO_SHOW = 12;

const DatePicker = ({
  date,
  setDate,
  mode = "single",
  startDate,
  endDate,
  setRangeDate,
  allowRangeReset,
  type = "day",
  minDate,
  maxDate,
  showMonthScroller = false
}: Props) => {
  const { isDark, text } = useTheme();
  const initialVisibleDate = dayjs(date ?? minDate ?? new Date());
  const [visibleMonth, setVisibleMonth] = useState(initialVisibleDate.month());
  const [visibleYear, setVisibleYear] = useState(initialVisibleDate.year());
  const [lastDate, setLastDate] = useState(date);

  if (date !== lastDate) {
    setLastDate(date);

    if (date) {
      const selectedDate = dayjs(date);
      if (selectedDate.isValid()) {
        setVisibleMonth(selectedDate.month());
        setVisibleYear(selectedDate.year());
      }
    }
  }

  const months = useMemo(() => {
    const start = dayjs(minDate ?? new Date()).startOf("month");
    const end = maxDate
      ? dayjs(maxDate).startOf("month")
      : start.add(DEFAULT_MONTHS_TO_SHOW - 1, "month");
    const monthItems = [];

    let current = start;
    while (current.isBefore(end) || current.isSame(end, "month")) {
      monthItems.push(current);
      current = current.add(1, "month");
    }

    return monthItems;
  }, [maxDate, minDate]);

  const onSelectMonth = (monthDate: dayjs.Dayjs) => {
    setVisibleMonth(monthDate.month());
    setVisibleYear(monthDate.year());
  };

  const selectedDateLabelColor = text.primary;

  return (
    <View>
      {showMonthScroller ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
          contentContainerStyle={{ paddingHorizontal: 4, gap: 16 }}
        >
          {months.map((monthDate) => {
            const isSelected =
              visibleMonth === monthDate.month() &&
              visibleYear === monthDate.year();
            const monthLabelColor = isDark
              ? isSelected
                ? "#ECECED"
                : "#61656C"
              : isSelected
                ? "#414651"
                : "#D5D7DA";

            return (
              <Pressable
                key={monthDate.format("YYYY-MM")}
                onPress={() => onSelectMonth(monthDate)}
                className="py-1"
              >
                <Text
                  className="text-lg font-bold text-center"
                  style={{ color: monthLabelColor }}
                >
                  {monthDate.format("MMMM YYYY")}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}
      <DateTimePicker
        mode={mode}
        date={date}
        startDate={startDate}
        endDate={endDate}
        allowRangeReset={allowRangeReset}
        minDate={minDate}
        maxDate={maxDate}
        startYear={minDate ? dayjs(minDate).year() : undefined}
        endYear={maxDate ? dayjs(maxDate).year() : undefined}
        month={visibleMonth}
        year={visibleYear}
        onMonthChange={setVisibleMonth}
        onYearChange={setVisibleYear}
        timePicker={type === "time"}
        initialView={type === "time" ? "time" : "day"}
        hideHeader={showMonthScroller}
        components={{
          IconPrev: <ChevronLeft />,
          IconNext: <ChevronRight />
        }}
        styles={{
          disabled: {
            backgroundColor: isDark ? "#18181B" : "#F2F4F7",
            opacity: 0.45
          },
          disabled_label: {
            color: isDark ? "#3F3F46" : "#D0D5DD"
          },
          day_cell: {
            height: showMonthScroller ? 52 : 60
          },
          day_label: {
            color: isDark ? "#808089" : "#717680",
            fontSize: 16
          },
          month: {
            backgroundColor: isDark ? "#E8ECEE" : "#2a2b2b",
            borderRadius: 6
          },
          month_label: {
            color: "#808089"
          },
          year_label: {
            color: "#808089"
          },
          weekday_label: {
            color: "#808089"
          },
          month_selector_label: {
            color: isDark ? "#CECFD2" : "#414651"
          },
          year_selector_label: {
            color: isDark ? "#CECFD2" : "#414651"
          },
          time_label: {
            color: isDark ? "#ffffff" : "#000000",
            fontSize: 18
          },
          day: {
            borderRadius: 6
          },
          range_fill: {
            backgroundColor: isDark ? "#1A94FF33" : "#E4EFFE"
          },
          range_middle: {
            backgroundColor: isDark ? "#1A94FF33" : "#E4EFFE"
          },
          today: { borderColor: "#1A94FF", borderWidth: 1 },
          today_label: {
            color: "#1A94FF"
          },
          selected: { backgroundColor: "#007AFF" },
          selected_label: { color: selectedDateLabelColor },
          range_start: { backgroundColor: "#007AFF" },
          range_start_label: { color: selectedDateLabelColor },
          range_end: { backgroundColor: "#007AFF" },
          range_end_label: { color: selectedDateLabelColor }
        }}
        onChange={(value: DatePickerChange) => {
          if (mode === "range") {
            setRangeDate?.({
              startDate: value.startDate,
              endDate: value.endDate
            });
            return;
          }

          setDate(value.date);
        }}
      />
    </View>
  );
};

export default DatePicker;
