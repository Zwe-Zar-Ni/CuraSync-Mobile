import { ApiError, Patient } from '@/common/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import profileService from '../services';
import type { EditProfileSchema } from '../validations/edit-profile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, ApiError, EditProfileSchema>({
    mutationKey: ['update-patient-profile'],
    mutationFn: profileService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['patient-profile'], data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationKey: ['logout'],
    mutationFn: profileService.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-me'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationKey: ['delete-account'],
    mutationFn: profileService.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-me'] });
    },
  });
};
