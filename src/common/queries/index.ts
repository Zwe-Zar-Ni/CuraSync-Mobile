import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../types';
import commonService from '../service';
import { Specialization } from '../types/doctor';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile-me'],
    queryFn: commonService.getProfile,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

//? patient/home has its own same-shape hook backed by its own mock, so the keys are kept apart
export const useGetSpecializations = () => {
  return useQuery<Specialization[], ApiError>({
    queryKey: ['public-specializations'],
    queryFn: commonService.getSpecializations,
  });
};
