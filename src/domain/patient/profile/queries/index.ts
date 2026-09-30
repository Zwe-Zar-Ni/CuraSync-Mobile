import { ApiError } from "@/common/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import profileService from "../services";
import type { PatientProfileResponse } from "../types";
import type { EditProfileSchema } from "../validations/edit-profile";

export const useGetProfile = () => {
  return useQuery<PatientProfileResponse, ApiError>({
    queryKey: ["patient-profile"],
    queryFn: profileService.getProfile
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<PatientProfileResponse, ApiError, EditProfileSchema>({
    mutationKey: ["update-patient-profile"],
    mutationFn: profileService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["patient-profile"], data);
    }
  });
};
