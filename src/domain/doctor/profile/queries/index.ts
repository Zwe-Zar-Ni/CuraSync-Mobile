import { ApiError, Doctor } from "@/common/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../services";
import type { EditProfileSchema } from "../validations/edit-profile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Doctor, ApiError, EditProfileSchema>({
    mutationKey: ["update-doctor-profile"],
    mutationFn: profileService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["doctor-me"], data);
    }
  });
};

export const useLogout = () => {
  return useMutation<{ success: boolean }, ApiError, void>({
    mutationKey: ["doctor-logout"],
    mutationFn: profileService.logout
  });
};

export const useDeleteAccount = () => {
  return useMutation<{ success: boolean }, ApiError, void>({
    mutationKey: ["doctor-delete-account"],
    mutationFn: profileService.deleteAccount
  });
};
