import { httpClient } from "@/common/api/apiClient";
import type { EditProfileSchema } from "../validations/edit-profile";
import { Patient } from "@/common/types";

const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

class ProfileService {
  async updateProfile(input: EditProfileSchema) {
    const response = await httpClient.patch<Patient>("/patients/profile", {
      name: input.name.trim(),
      phone_number: toNullable(input.phone_number),
      profile_url: toNullable(input.profile_url),
      date_of_birth: toNullable(input.date_of_birth),
      gender: input.gender,
      blood_type: toNullable(input.blood_type)
    });
    return response.data;
  }

  async logout() {
    return { success: true };
    // await httpClient.post("/me/logout");
  }

  async deleteAccount() {
    return { success: true };
    // await httpClient.post("/me/delete-account");
  }
}

const profileService = new ProfileService();

export default profileService;
