import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { View } from "react-native";
import { useState } from "react";
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
};

type DatePickerChange = {
  date?: DateType;
  startDate?: DateType;
  endDate?: DateType;
};

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
  maxDate
}: Props) => {
  const { text, colors } = useTheme();
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

  return (
    <View>
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
        use12Hours={true}
        hideHeader={false}
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
        components={{
          IconPrev: <ChevronLeft color={text.secondary} />,
          IconNext: <ChevronRight color={text.secondary} />
        }}
        styles={{
          disabled: {
            backgroundColor: colors.surface,
            opacity: 0.45
          },
          disabled_label: {
            color: text.secondary
          },
          day_cell: {
            height: 50
          },
          day_label: {
            color: text.primary,
            fontSize: 16
          },
          month: {
            backgroundColor: colors.surface,
            borderRadius: 6
          },
          month_label: {
            color: text.primary
          },
          year_label: {
            color: text.primary
          },
          weekday_label: {
            color: text.secondary
          },
          month_selector_label: {
            color: text.primary
          },
          year_selector_label: {
            color: text.primary
          },
          time_selector_label: {
            color: text.primary
          },
          time_label: {
            color: text.primary,
            fontSize: 18
          },
          day: {
            borderRadius: 6
          },
          range_fill: {
            backgroundColor: colors.secondary
          },
          range_middle: {
            backgroundColor: colors.secondary
          },
          today: { borderColor: colors.secondary, borderWidth: 1 },
          today_label: {
            color: colors.secondary
          },
          selected: { backgroundColor: colors.primary },
          selected_label: { color: "white" },
          range_start: { backgroundColor: colors.primary },
          range_start_label: { color: "white" },
          range_end: { backgroundColor: colors.primary },
          range_end_label: { color: "white" }
        }}
      />
    </View>
  );
};

export default DatePicker;
