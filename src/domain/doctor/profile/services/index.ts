// import { httpClient } from "@/common/api/apiClient";
// import { Doctor } from "@/common/types";
// import { toNullable, toFee } from "@/common/utils/transformers";
import type { EditProfileSchema } from "../validations/edit-profile";
import { doctorProfile } from "@/common/service/dummy";

class ProfileService {
  async updateProfile(input: EditProfileSchema) {
    return doctorProfile;
    // const payload = {
    //   name: input.name.trim(),
    //   phone_number: toNullable(input.phone_number),
    //   license_number: toNullable(input.license_number),
    //   standard_consultation_fee: toFee(input.standard_consultation_fee),
    //   bio: toNullable(input.bio)
    // };
    // const response = await httpClient.patch<Doctor>(
    //   "/doctors/profile",
    //   payload
    // );
    // return response.data;
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
