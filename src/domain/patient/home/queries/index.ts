import { ApiError, PaginatedResponse } from '@/common/types';
import homeService from '../services';
import { useQuery } from '@tanstack/react-query';
import { DoctorResource, Specialization } from '@/common/types/doctor';

export const useGetSpecializations = () => {
  return useQuery<Specialization[], ApiError>({
    queryKey: ['specializations'],
    queryFn: homeService.getSpecializations,
  });
};

export const useGetDoctors = (specializationId?: number) => {
  return useQuery<PaginatedResponse<DoctorResource>, ApiError>({
    queryKey: ['doctors', specializationId],
    queryFn: () => homeService.getDoctors(specializationId),
  });
};
