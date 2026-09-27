import { httpClient } from "@/common/api/apiClient";
import type { AuthResponse } from "../types";
import { LoginSchema } from "../validations/login";
import type { RegisterSchema } from "../validations/register";
import { RegisterDoctorSchema } from "../validations/register-doctor";
import { DoctorProfileSchema } from "../validations/doctor-profile";
import { UserProfile } from "@/common/types";
import { PatientProfileSchema } from "../validations/patient-profile";

class AuthService {
  async registerPatient(input: RegisterSchema) {
    const response = await httpClient.post<AuthResponse>(
      "/auth/register-patient",
      input
    );
    return response.data;
  }
  async registerDoctor(input: RegisterDoctorSchema) {
    const response = await httpClient.post<AuthResponse>(
      "/auth/register-doctor",
      input
    );
    return response.data;
  }
  async login(input: LoginSchema) {
    const response = await httpClient.post<AuthResponse>("/auth/login", input);
    return response.data;
  }
  async updateDoctorProfile(input: DoctorProfileSchema) {
    const response = await httpClient.patch<UserProfile>(
      "/doctors/profile",
      input
    );
    return response.data;
  }
  async updatePatientProfile(input: PatientProfileSchema) {
    const response = await httpClient.patch<UserProfile>(
      "/patients/profile",
      input
    );
    return response.data;
  }
}

const authService = new AuthService();

export default authService;
