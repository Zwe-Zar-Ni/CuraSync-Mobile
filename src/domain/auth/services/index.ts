import { httpClient } from "@/common/api/apiClient";
import type { LoginResponse, RegisterResponse } from "../types";
import { LoginSchema } from "../validations/login";
import type { RegisterSchema } from "../validations/register";
import { RegisterDoctorSchema } from "../validations/register-doctor";

class AuthService {
  async registerPatient(input: RegisterSchema) {
    const response = await httpClient.post<RegisterResponse>(
      "/auth/register-patient",
      input
    );
    return response.data;
  }
  async registerDoctor(input: RegisterDoctorSchema) {
    const response = await httpClient.post<RegisterResponse>(
      "/auth/register-doctor",
      input
    );
    return response.data;
  }
  async login(input: LoginSchema) {
    const response = await httpClient.post<LoginResponse>("/auth/login", input);
    return response.data;
  }
}

const authService = new AuthService();

export default authService;
