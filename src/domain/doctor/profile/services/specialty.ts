import { httpClient } from "@/common/api/apiClient";
import { DoctorSpecialty, DoctorSpecialtyPayload } from "../types/specialty";

class SpecialtyService {
  async getSpecialties() {
    const response = await httpClient.get<DoctorSpecialty[]>(
      "/doctors/specialties"
    );
    return response.data;
  }

  async createSpecialty(specialty: DoctorSpecialtyPayload) {
    const response = await httpClient.post<DoctorSpecialty>(
      "/doctors/specialties",
      specialty
    );
    return response.data;
  }

  async deleteSpecialty(id: number) {
    const response = await httpClient.delete<DoctorSpecialty>(
      `/doctors/specialties/${id}`
    );
    return response.data;
  }
}

const specialtyService = new SpecialtyService();
export default specialtyService;
