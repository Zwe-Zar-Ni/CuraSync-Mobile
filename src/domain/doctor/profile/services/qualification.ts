// import { httpClient } from "@/common/api/apiClient";
// import { Qualification } from "../types/qualification";
// import {toNullable} from "@/common/utils/transformers";

import {
  QualificationSchema,
  UpdateQualificationSchema
} from "../validations/qualification";
import { qualificationStore } from "./dummy";

class QualificationService {
  async getQualifications() {
    return qualificationStore.list();
    // const response = await httpClient.get<Qualification[]>(
    //   "/doctors/qualifications"
    // );
    // return response.data;
  }

  async createQualification(input: QualificationSchema) {
    return qualificationStore.create({ ...input, id: 0 });
    // const payload = {
    //   name: input.name.trim(),
    //   institution: input.institution.trim(),
    //   year: Number(input.year.trim()),
    //   certificate_url: toNullable(input.certificate_url)
    // };
    // const response = await httpClient.post<Qualification>(
    //   "/doctors/qualifications",
    //   payload
    // );
    // return response.data;
  }

  async updateQualification({ id, ...input }: UpdateQualificationSchema) {
    return qualificationStore.update(id, { ...input, id });
    // const payload = {
    //   name: input.name.trim(),
    //   institution: input.institution.trim(),
    //   year: Number(input.year.trim()),
    //   certificate_url: toNullable(input.certificate_url)
    // };
    // const response = await httpClient.patch<Qualification>(
    //   `/doctors/qualifications/${id}`,
    //   payload
    // );
    // return response.data;
  }

  async deleteQualification(id: number) {
    return qualificationStore.remove(id);
    // await httpClient.delete(`/doctors/qualifications/${id}`);
  }
}

const qualificationService = new QualificationService();
export default qualificationService;
