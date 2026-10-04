// import { httpClient } from "../api/apiClient";
// import { Doctor, Patient, Specialization } from "../types";
import { doctorProfile, specializations } from "./dummy";

class CommonService {
  async getProfile() {
    return doctorProfile;
    // const response = await httpClient.get<Doctor | Patient>("/me");
    // return response.data;
  }

  async getSpecializations() {
    return specializations;
    // const response = await httpClient.get<Specialization[]>(
    //   "/public/specializations"
    // );
    // return response.data;
  }
}

const commonService = new CommonService();
export default commonService;
