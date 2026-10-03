import { httpClient } from "@/common/api/apiClient";
import { doctorProfile } from "./dummy";
import { Doctor } from "@/common/types";

class ProfileService {
  async getProfile() {
    return doctorProfile;
    const response = await httpClient.get<Doctor>("/me");
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
