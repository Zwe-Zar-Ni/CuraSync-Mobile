import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Condition } from "../types/condition";
import { ApiError } from "@/common/types";
import conditionService from "../services/condition";
import { ConditionSchema, UpdateConditionSchema } from "../validations/condition";

export const useGetConditions = () => {
  return useQuery<Condition[], ApiError>({
    queryKey: ["patient-conditions"],
    queryFn: conditionService.getConditions
  });
};

export const useCreateCondition = () => {
  const queryClient = useQueryClient();

  return useMutation<Condition, ApiError, ConditionSchema>({
    mutationKey: ["create-patient-condition"],
    mutationFn: conditionService.createCondition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-conditions"] });
    }
  });
};

export const useUpdateCondition = () => {
  const queryClient = useQueryClient();

  return useMutation<Condition | null, ApiError, UpdateConditionSchema>({
    mutationKey: ["update-patient-condition"],
    mutationFn: conditionService.updateCondition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-conditions"] });
    }
  });
};

export const useDeleteCondition = () => {
  const queryClient = useQueryClient();

  return useMutation<Condition | null, ApiError, number>({
    mutationKey: ["delete-patient-condition"],
    mutationFn: conditionService.deleteCondition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-conditions"] });
    }
  });
};