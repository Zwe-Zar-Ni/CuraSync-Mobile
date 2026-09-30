import { httpClient } from "@/common/api/apiClient";
import type { EditProfileSchema } from "../validations/edit-profile";
import { patientProfile } from "./dummy";
import type { PatientProfileResponse } from "../types";

const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

class ProfileService {
  async getProfile() {
    return patientProfile;
    const response = await httpClient.get<PatientProfileResponse>("/me");
    return response.data;
  }

  async updateProfile(input: EditProfileSchema) {
    const response = await httpClient.patch<PatientProfileResponse>(
      "/patients/profile",
      {
        name: input.name.trim(),
        phone_number: toNullable(input.phone_number),
        profile_url: toNullable(input.profile_url),
        date_of_birth: toNullable(input.date_of_birth),
        gender: input.gender,
        blood_type: toNullable(input.blood_type)
      }
    );
    return response.data;
  }
}

const profileService = new ProfileService();

export default profileService;
