import type { Schedule, ScheduleRequest } from '../types';
import { httpClient } from '@/common/api/apiClient';
import { ScheduleSchema, UpdateScheduleSchema } from '../validations/schedule';

class ScheduleService {
  async getSchedules() {
    const response = await httpClient.get<Schedule[]>('/doctors/schedules');
    return response.data;
  }

  async getScheduleRequests() {
    const response = await httpClient.get<ScheduleRequest[]>(
      '/doctors/schedule-requests',
    );
    return response.data;
  }

  async createSchedule(input: ScheduleSchema) {
    const payload = {
      day_of_week: String(input.day_of_week),
      start_time: input.start_time.slice(0, 5),
      end_time: input.end_time.slice(0, 5),
      slot_duration_minutes: input.slot_duration_minutes,
    };
    const response = await httpClient.post<Schedule>(
      '/doctors/schedule-requests',
      payload,
    );
    return response.data;
  }

  async updateSchedule({ id, ...input }: UpdateScheduleSchema) {
    const payload = {
      day_of_week: String(input.day_of_week),
      start_time: input.start_time.slice(0, 5),
      end_time: input.end_time.slice(0, 5),
      slot_duration_minutes: input.slot_duration_minutes,
    };
    const response = await httpClient.patch<Schedule>(
      `/doctors/schedule-requests/${id}`,
      payload,
    );
    return response.data;
  }

  async deleteSchedule(id: number) {
    await httpClient.delete(`/doctors/schedule-requests/${id}`);
  }
}

const scheduleService = new ScheduleService();
export default scheduleService;
