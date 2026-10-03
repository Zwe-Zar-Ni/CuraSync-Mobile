import { httpClient } from "@/common/api/apiClient";
import { Doctor } from "@/common/types";
import { doctorProfileStore } from "./dummy";
import type { EditProfileSchema } from "../validations/edit-profile";

const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const toFee = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? Number(trimmed) : null;
};

class ProfileService {
  async getProfile() {
    return doctorProfileStore.get();
    const response = await httpClient.get<Doctor>("/me");
    return response.data;
  }

  async updateProfile(input: EditProfileSchema) {
    const payload = {
      name: input.name.trim(),
      phone_number: toNullable(input.phone_number),
      license_number: toNullable(input.license_number),
      standard_consultation_fee: toFee(input.standard_consultation_fee),
      bio: toNullable(input.bio)
    };
    return doctorProfileStore.update(payload);
    const response = await httpClient.patch<Doctor>("/doctors/profile", payload);
    return response.data;
  }

  async logout() {
    return { success: true };
    await httpClient.post("/me/logout");
  }

  async deleteAccount() {
    return { success: true };
    await httpClient.post("/me/delete-account");
  }
}

const profileService = new ProfileService();
export default profileService;
