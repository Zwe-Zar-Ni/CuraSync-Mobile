import { ApiError } from "@/common/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import scheduleService from "../services/schedule";
import type { Schedule } from "../types";
import {
  ScheduleSchema,
  UpdateScheduleSchema
} from "../validations/schedule";

export const useGetSchedules = () => {
  return useQuery<Schedule[], ApiError>({
    queryKey: ["doctor-schedules"],
    queryFn: scheduleService.getSchedules
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<Schedule, ApiError, ScheduleSchema>({
    mutationKey: ["create-doctor-schedule"],
    mutationFn: scheduleService.createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    }
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<Schedule | null, ApiError, UpdateScheduleSchema>({
    mutationKey: ["update-doctor-schedule"],
    mutationFn: scheduleService.updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    }
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<Schedule | null, ApiError, number>({
    mutationKey: ["delete-doctor-schedule"],
    mutationFn: scheduleService.deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    }
  });
};