import dayjs from "dayjs";
import type { Schedule } from "../types";
import type { ScheduleOverride } from "../types/override";
import type { UpdateScheduleSchema } from "../validations/schedule";
import type { UpdateOverrideSchema } from "../validations/override";

//! UI phase only — in-memory stand-in for /doctors/schedules and /doctors/schedule-overrides. Swap for httpClient calls once the API is wired.

let scheduleRecords: Schedule[] = [
  {
    id: 1,
    doctor_id: 1,
    day_of_week: 1,
    start_time: "09:00:00",
    end_time: "13:00:00",
    slot_duration_minutes: 20,
    is_active: true,
    created_at: "2026-07-02T04:15:00.000000Z",
    updated_at: "2026-07-02T04:15:00.000000Z"
  },
  {
    id: 2,
    doctor_id: 1,
    day_of_week: 2,
    start_time: "16:00:00",
    end_time: "19:00:00",
    slot_duration_minutes: 15,
    is_active: true,
    created_at: "2026-07-02T04:16:00.000000Z",
    updated_at: "2026-07-02T04:16:00.000000Z"
  },
  {
    id: 3,
    doctor_id: 1,
    day_of_week: 3,
    start_time: "10:00:00",
    end_time: "14:00:00",
    slot_duration_minutes: 30,
    is_active: false,
    created_at: "2026-08-19T09:40:00.000000Z",
    updated_at: "2026-08-19T09:40:00.000000Z"
  },
  {
    id: 4,
    doctor_id: 1,
    day_of_week: 6,
    start_time: "08:30:00",
    end_time: "12:00:00",
    slot_duration_minutes: 15,
    is_active: true,
    created_at: "2026-09-01T02:05:00.000000Z",
    updated_at: "2026-09-01T02:05:00.000000Z"
  }
];

export const scheduleStore = {
  list: () =>
    [...scheduleRecords].sort(
      (a, b) =>
        a.day_of_week - b.day_of_week ||
        a.start_time.localeCompare(b.start_time)
    ),
  create: (input: UpdateScheduleSchema) => {
    const timestamp = new Date().toISOString();
    const schedule: Schedule = {
      id: scheduleRecords.length + 1,
      doctor_id: 1,
      day_of_week: input.day_of_week,
      start_time: input.start_time,
      end_time: input.end_time,
      slot_duration_minutes: input.slot_duration_minutes ?? 15,
      //? The backend controller stores every new schedule as inactive; `is_active` is not part of the validated payload
      is_active: false,
      created_at: timestamp,
      updated_at: timestamp
    };
    scheduleRecords = [...scheduleRecords, schedule];
    return schedule;
  },
  update: (id: number, input: UpdateScheduleSchema) => {
    const schedule = scheduleRecords.find((record) => record.id === id);
    if (!schedule) return null;
    const updated: Schedule = {
      ...schedule,
      day_of_week: input.day_of_week,
      start_time: input.start_time,
      end_time: input.end_time,
      slot_duration_minutes: input.slot_duration_minutes ?? 15,
      updated_at: new Date().toISOString()
    };
    scheduleRecords = scheduleRecords.map((record) =>
      record.id === id ? updated : record
    );
    return updated;
  },
  remove: (id: number) => {
    const schedule = scheduleRecords.find((record) => record.id === id) ?? null;
    scheduleRecords = scheduleRecords.filter((record) => record.id !== id);
    return schedule;
  }
};

let overrideRecords: ScheduleOverride[] = [
  {
    id: 1,
    doctor_id: 1,
    date: dayjs().add(9, "day").format("YYYY-MM-DD"),
    type: "UNAVAILABLE",
    start_time: null,
    end_time: null,
    slot_duration_minutes: 15,
    reason: "Medical conference",
    created_at: "2026-09-28T03:20:00.000000Z",
    updated_at: "2026-09-28T03:20:00.000000Z"
  },
  {
    id: 2,
    doctor_id: 1,
    date: dayjs().add(16, "day").format("YYYY-MM-DD"),
    type: "CUSTOM_HOURS",
    start_time: "18:00:00",
    end_time: "21:00:00",
    slot_duration_minutes: 30,
    reason: "Evening clinic only",
    created_at: "2026-10-01T08:45:00.000000Z",
    updated_at: "2026-10-01T08:45:00.000000Z"
  }
];

export const overrideStore = {
  //? Sorted by `date`, which is the real axis of an override — the weekly schedule plays no part in it
  list: () =>
    [...overrideRecords].sort((a, b) => a.date.localeCompare(b.date)),
  create: (input: UpdateOverrideSchema) => {
    const timestamp = new Date().toISOString();
    const override: ScheduleOverride = {
      id: overrideRecords.length + 1,
      doctor_id: 1,
      date: input.date,
      type: input.type,
      start_time: input.start_time,
      end_time: input.end_time,
      slot_duration_minutes: input.slot_duration_minutes ?? 15,
      reason: input.reason,
      created_at: timestamp,
      updated_at: timestamp
    };
    overrideRecords = [...overrideRecords, override];
    return override;
  },
  update: (id: number, input: UpdateOverrideSchema) => {
    const override = overrideRecords.find((record) => record.id === id);
    if (!override) return null;
    const updated: ScheduleOverride = {
      ...override,
      date: input.date,
      type: input.type,
      start_time: input.start_time,
      end_time: input.end_time,
      slot_duration_minutes: input.slot_duration_minutes ?? 15,
      reason: input.reason,
      updated_at: new Date().toISOString()
    };
    overrideRecords = overrideRecords.map((record) =>
      record.id === id ? updated : record
    );
    return updated;
  },
  remove: (id: number) => {
    const override = overrideRecords.find((record) => record.id === id) ?? null;
    overrideRecords = overrideRecords.filter((record) => record.id !== id);
    return override;
  }
};
