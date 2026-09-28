import { ApiError, PaginatedResponse } from "@/common/types";
import homeService from "../services";
import { Doctor, Specialization } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useGetSpecializations = () => {
  return useQuery<Specialization[], ApiError>({
    queryKey: ["specializations"],
    queryFn: homeService.getSpecializations
  });
};

export const useGetDoctors = (specializationId?: number) => {
  return useQuery<PaginatedResponse<Doctor>, ApiError>({
    queryKey: ["doctors"],
    queryFn: () => homeService.getDoctors(specializationId)
  });
};
