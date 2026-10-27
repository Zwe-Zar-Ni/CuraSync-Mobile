import { httpClient } from "@/common/api/apiClient";
import { Qualification } from "../types/qualification";
import { toNullable } from "@/common/utils/transformers";
import {
  QualificationSchema,
  UpdateQualificationSchema
} from "../validations/qualification";

class QualificationService {
  async getQualifications() {
    const response = await httpClient.get<Qualification[]>(
      "/doctors/qualifications"
    );
    return response.data;
  }

  async createQualification(input: QualificationSchema) {
    const payload = {
      name: input.name.trim(),
      institution: input.institution.trim(),
      year: Number(input.year.trim()),
      certificate_url: toNullable(input.certificate_url)
    };
    const response = await httpClient.post<Qualification>(
      "/doctors/qualifications",
      payload
    );
    return response.data;
  }

  async updateQualification({ id, ...input }: UpdateQualificationSchema) {
    const payload = {
      name: input.name.trim(),
      institution: input.institution.trim(),
      year: Number(input.year.trim()),
      certificate_url: toNullable(input.certificate_url)
    };
    const response = await httpClient.patch<Qualification>(
      `/doctors/qualifications/${id}`,
      payload
    );
    return response.data;
  }

  async deleteQualification(id: number) {
    await httpClient.delete(`/doctors/qualifications/${id}`);
  }
}

const qualificationService = new QualificationService();
export default qualificationService;
