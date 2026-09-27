import { ApiError } from "@/common/types";
import { useMutation } from "@tanstack/react-query";
import authService from "../services";
import { LoginResponse, RegisterResponse } from "../types";
import { LoginSchema } from "../validations/login";
import { RegisterSchema } from "../validations/register";
import { RegisterDoctorSchema } from "../validations/register-doctor";

export const useRegisterPatient = () =>
  useMutation<RegisterResponse, ApiError, RegisterSchema>({
    mutationKey: ["register-patient"],
    mutationFn: authService.registerPatient
  });

export const useRegisterDoctor = () =>
  useMutation<RegisterResponse, ApiError, RegisterDoctorSchema>({
    mutationKey: ["register-doctor"],
    mutationFn: authService.registerDoctor
  });

export const useLogin = () =>
  useMutation<LoginResponse, ApiError, LoginSchema>({
    mutationKey: ["login"],
    mutationFn: authService.login
  });
