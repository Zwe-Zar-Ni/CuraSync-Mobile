import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Allergy } from "../types/allergy";
import { ApiError } from "@/common/types";
import allergyService from "../services/allergy";
import {
  AllergySchema,
  UpdateAllergySchema
} from "../validations/allergy";

export const useGetAllergies = () => {
  return useQuery<Allergy[], ApiError>({
    queryKey: ["patient-allergies"],
    queryFn: allergyService.getAllergies
  });
};

export const useCreateAllergy = () => {
  const queryClient = useQueryClient();

  return useMutation<Allergy, ApiError, AllergySchema>({
    mutationKey: ["create-patient-allergy"],
    mutationFn: allergyService.createAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-allergies"] });
    }
  });
};

export const useUpdateAllergy = () => {
  const queryClient = useQueryClient();

  return useMutation<Allergy | null, ApiError, UpdateAllergySchema>({
    mutationKey: ["update-patient-allergy"],
    mutationFn: allergyService.updateAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-allergies"] });
    }
  });
};

export const useDeleteAllergy = () => {
  const queryClient = useQueryClient();

  return useMutation<Allergy | null, ApiError, number>({
    mutationKey: ["delete-patient-allergy"],
    mutationFn: allergyService.deleteAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-allergies"] });
    }
  });
};
