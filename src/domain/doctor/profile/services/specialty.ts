// import { httpClient } from "@/common/api/apiClient";
import { DoctorSpecialtyPayload } from "../types/specialty";
import { specialtyStore } from "./dummy";

class SpecialtyService {
  async getSpecialties() {
    return specialtyStore.list();
    // const response = await httpClient.get<DoctorSpecialty[]>(
    //   "/doctors/specialties"
    // );
    // return response.data;
  }

  async createSpecialty(specialty: DoctorSpecialtyPayload) {
    return specialtyStore.create(specialty);
    // const response = await httpClient.post<DoctorSpecialty>(
    //   "/doctors/specialties",
    //   specialty
    // );
    // return response.data;
  }

  async deleteSpecialty(id: number) {
    return specialtyStore.delete(id);
    // const response = await httpClient.delete<DoctorSpecialty>(
    //   `/doctors/specialties/${id}`
    // );
    // return response.data;
  }
}

const specialtyService = new SpecialtyService();
export default specialtyService;
