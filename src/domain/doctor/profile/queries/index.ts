import { ApiError, Doctor } from "@/common/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import profileService from "../services";

export const useGetProfile = () => {
  return useQuery<Doctor, ApiError>({
    queryKey: ["doctor-me"],
    queryFn: profileService.getProfile
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
