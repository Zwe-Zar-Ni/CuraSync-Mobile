import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DoctorSpecialty, DoctorSpecialtyPayload } from "../types/specialty";
import { ApiError } from "@/common/types";
import specialtyService from "../services/specialty";

export const useGetSpecialties = () => {
  return useQuery<DoctorSpecialty[], ApiError>({
    queryKey: ["doctor-specialties"],
    queryFn: specialtyService.getSpecialties
  });
};

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<DoctorSpecialty, ApiError, DoctorSpecialtyPayload>({
    mutationKey: ["create-doctor-specialty"],
    mutationFn: specialtyService.createSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-specialties"] });
    }
  });
};

export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<DoctorSpecialty | null, ApiError, number>({
    mutationKey: ["delete-doctor-specialty"],
    mutationFn: specialtyService.deleteSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-specialties"] });
    }
  });
};
