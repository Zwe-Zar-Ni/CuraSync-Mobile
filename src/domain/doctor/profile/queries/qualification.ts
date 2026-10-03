import { ApiError } from "@/common/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qualificationService from "../services/qualification";
import type { Qualification } from "../types/qualification";
import {
  QualificationSchema,
  UpdateQualificationSchema
} from "../validations/qualification";

export const useGetQualifications = () => {
  return useQuery<Qualification[], ApiError>({
    queryKey: ["doctor-qualifications"],
    queryFn: qualificationService.getQualifications
  });
};

export const useCreateQualification = () => {
  const queryClient = useQueryClient();

  return useMutation<Qualification, ApiError, QualificationSchema>({
    mutationKey: ["create-doctor-qualification"],
    mutationFn: qualificationService.createQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-qualifications"] });
    }
  });
};

export const useUpdateQualification = () => {
  const queryClient = useQueryClient();

  return useMutation<Qualification | null, ApiError, UpdateQualificationSchema>({
    mutationKey: ["update-doctor-qualification"],
    mutationFn: qualificationService.updateQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-qualifications"] });
    }
  });
};

export const useDeleteQualification = () => {
  const queryClient = useQueryClient();

  return useMutation<Qualification | null, ApiError, number>({
    mutationKey: ["delete-doctor-qualification"],
    mutationFn: qualificationService.deleteQualification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-qualifications"] });
    }
  });
};
