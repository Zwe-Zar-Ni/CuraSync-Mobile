import { ApiError } from "@/common/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import scheduleOverrideService from "../services/override";
import type { ScheduleOverride } from "../types/override";
import {
  OverrideSchema,
  UpdateOverrideSchema
} from "../validations/override";

export const useGetOverrides = () => {
  return useQuery<ScheduleOverride[], ApiError>({
    queryKey: ["doctor-schedule-overrides"],
    queryFn: scheduleOverrideService.getOverrides
  });
};

export const useCreateOverride = () => {
  const queryClient = useQueryClient();

  return useMutation<ScheduleOverride, ApiError, OverrideSchema>({
    mutationKey: ["create-doctor-schedule-override"],
    mutationFn: scheduleOverrideService.createOverride,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-schedule-overrides"]
      });
    }
  });
};

export const useUpdateOverride = () => {
  const queryClient = useQueryClient();

  return useMutation<ScheduleOverride | null, ApiError, UpdateOverrideSchema>({
    mutationKey: ["update-doctor-schedule-override"],
    mutationFn: scheduleOverrideService.updateOverride,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-schedule-overrides"]
      });
    }
  });
};

export const useDeleteOverride = () => {
  const queryClient = useQueryClient();

  return useMutation<ScheduleOverride | null, ApiError, number>({
    mutationKey: ["delete-doctor-schedule-override"],
    mutationFn: scheduleOverrideService.deleteOverride,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-schedule-overrides"]
      });
    }
  });
};