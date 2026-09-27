import { ApiError, UserProfile } from "@/common/types";
import { useMutation } from "@tanstack/react-query";
import authService from "../services";
import { AuthResponse } from "../types";
import { LoginSchema } from "../validations/login";
import { RegisterSchema } from "../validations/register";
import { RegisterDoctorSchema } from "../validations/register-doctor";
import { DoctorProfileSchema } from "../validations/doctor-profile";
import { PatientProfileSchema } from "../validations/patient-profile";

export const useRegisterPatient = () =>
  useMutation<AuthResponse, ApiError, RegisterSchema>({
    mutationKey: ["register-patient"],
    mutationFn: authService.registerPatient
  });

export const useRegisterDoctor = () =>
  useMutation<AuthResponse, ApiError, RegisterDoctorSchema>({
    mutationKey: ["register-doctor"],
    mutationFn: authService.registerDoctor
  });

export const useLogin = () =>
  useMutation<AuthResponse, ApiError, LoginSchema>({
    mutationKey: ["login"],
    mutationFn: authService.login
  });

export const useUpdateDoctorProfile = () =>
  useMutation<UserProfile, ApiError, DoctorProfileSchema>({
    mutationKey: ["update-doctor-profile"],
    mutationFn: authService.updateDoctorProfile
  });

export const useUpdatePatientProfile = () =>
  useMutation<UserProfile, ApiError, PatientProfileSchema>({
    mutationKey: ["update-patient-profile"],
    mutationFn: authService.updatePatientProfile
  });
