import { ApiError, Patient } from "@/common/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import profileService from "../services";
import type { EditProfileSchema } from "../validations/edit-profile";

export const useGetProfile = () => {
  return useQuery<Patient, ApiError>({
    queryKey: ["patient-profile"],
    queryFn: profileService.getProfile
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, ApiError, EditProfileSchema>({
    mutationKey: ["update-patient-profile"],
    mutationFn: profileService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["patient-profile"], data);
    }
  });
};
