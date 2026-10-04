import { useQuery } from "@tanstack/react-query";
import { ApiError, Specialization } from "../types";
import commonService from "../service";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile-me"],
    queryFn: commonService.getProfile
  });
};

//? patient/home has its own same-shape hook backed by its own mock, so the keys are kept apart
export const useGetSpecializations = () => {
  return useQuery<Specialization[], ApiError>({
    queryKey: ["public-specializations"],
    queryFn: commonService.getSpecializations
  });
};