import { ApiError, Doctor } from '@/common/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import profileService from '../services';
import type { EditProfileSchema } from '../validations/edit-profile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Doctor, ApiError, EditProfileSchema>({
    mutationKey: ['update-doctor-profile'],
    mutationFn: profileService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-me'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, void>({
    mutationKey: ['doctor-logout'],
    mutationFn: profileService.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-me'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, void>({
    mutationKey: ['doctor-delete-account'],
    mutationFn: profileService.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-me'] });
    },
  });
};
