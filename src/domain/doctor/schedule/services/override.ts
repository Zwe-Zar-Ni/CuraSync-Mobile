import { toNullable } from "@/common/utils/transformers";
import { ScheduleOverride } from "../types/override";
import { OverrideSchema, UpdateOverrideSchema } from "../validations/override";

import { httpClient } from "@/common/api/apiClient";

class ScheduleOverrideService {
  async getOverrides() {
    const response = await httpClient.get<ScheduleOverride[]>(
      "/doctors/schedule-overrides"
    );
    return response.data;
  }

  async createOverride(input: OverrideSchema) {
    const payload = {
      date: input.date,
      type: input.type,
      start_time:
        input.type === "CUSTOM_HOURS" && input.start_time
          ? input.start_time.slice(0, 5)
          : null,
      end_time:
        input.type === "CUSTOM_HOURS" && input.end_time
          ? input.end_time.slice(0, 5)
          : null,
      slot_duration_minutes: input.slot_duration_minutes,
      reason: toNullable(input.reason)
    };
    const response = await httpClient.post<ScheduleOverride>(
      "/doctors/schedule-overrides",
      payload
    );
    return response.data;
  }

  async updateOverride({ id, ...input }: UpdateOverrideSchema) {
    const payload = {
      date: input.date,
      type: input.type,
      start_time:
        input.type === "CUSTOM_HOURS" && input.start_time
          ? input.start_time.slice(0, 5)
          : null,
      end_time:
        input.type === "CUSTOM_HOURS" && input.end_time
          ? input.end_time.slice(0, 5)
          : null,
      slot_duration_minutes: input.slot_duration_minutes,
      reason: toNullable(input.reason)
    };
    const response = await httpClient.patch<ScheduleOverride>(
      `/doctors/schedule-overrides/${id}`,
      payload
    );
    return response.data;
  }

  async deleteOverride(id: number) {
    await httpClient.delete(`/doctors/schedule-overrides/${id}`);
  }
}

const scheduleOverrideService = new ScheduleOverrideService();
export default scheduleOverrideService;
