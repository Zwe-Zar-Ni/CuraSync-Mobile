import {
  OverrideSchema,
  UpdateOverrideSchema
} from "../validations/override";
import { overrideStore } from "./dummy";

// import { httpClient } from "@/common/api/apiClient";

class ScheduleOverrideService {
  async getOverrides() {
    return overrideStore.list();
    // const response = await httpClient.get<ScheduleOverride[]>(
    //   "/doctors/schedule-overrides"
    // );
    // return response.data;
  }

  async createOverride(input: OverrideSchema) {
    return overrideStore.create({ ...input, id: 0 });
    // const payload = {
    //   date: input.date,
    //   type: input.type,
    //   start_time: input.start_time?.slice(0, 5) ?? null,
    //   end_time: input.end_time?.slice(0, 5) ?? null,
    //   slot_duration_minutes: input.slot_duration_minutes,
    //   reason: input.reason?.trim() ? input.reason.trim() : null
    // };
    // const response = await httpClient.post<ScheduleOverride>(
    //   "/doctors/schedule-overrides",
    //   payload
    // );
    // return response.data;
  }

  async updateOverride({ id, ...input }: UpdateOverrideSchema) {
    return overrideStore.update(id, { ...input, id });
    // const payload = {
    //   date: input.date,
    //   type: input.type,
    //   start_time: input.start_time?.slice(0, 5) ?? null,
    //   end_time: input.end_time?.slice(0, 5) ?? null,
    //   slot_duration_minutes: input.slot_duration_minutes,
    //   reason: input.reason?.trim() ? input.reason.trim() : null
    // };
    // const response = await httpClient.patch<ScheduleOverride>(
    //   `/doctors/schedule-overrides/${id}`,
    //   payload
    // );
    // return response.data;
  }

  async deleteOverride(id: number) {
    return overrideStore.remove(id);
    // await httpClient.delete(`/doctors/schedule-overrides/${id}`);
  }
}

const scheduleOverrideService = new ScheduleOverrideService();
export default scheduleOverrideService;