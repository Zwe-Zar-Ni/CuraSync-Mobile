// import { httpClient } from "@/common/api/apiClient";
// import { Allergy } from "../types/allergy";
import { AllergySchema, UpdateAllergySchema } from "../validations/allergy";
import { allergyStore } from "./dummy";

const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

class AllergyService {
  async getAllergies() {
    return allergyStore.list();
    // const response = await httpClient.get<Allergy[]>("/patients/allergies");
    // return response.data;
  }

  async createAllergy(input: AllergySchema) {
    const payload = {
      name: input.name.trim(),
      severity: input.severity,
      note: toNullable(input.note)
    };
    return allergyStore.create(payload);
    // const response = await httpClient.post<Allergy>(
    //   "/patients/allergies",
    //   payload
    // );
    // return response.data;
  }

  async updateAllergy({ id, ...input }: UpdateAllergySchema) {
    const payload = {
      name: input.name.trim(),
      severity: input.severity,
      note: toNullable(input.note)
    };
    return allergyStore.update(id, payload);
    // const response = await httpClient.patch<Allergy>(
    //   `/patients/allergies/${id}`,
    //   payload
    // );
    // return response.data;
  }

  async deleteAllergy(id: number) {
    return allergyStore.remove(id);
    // await httpClient.delete(`/patients/allergies/${id}`);
  }
}

const allergyService = new AllergyService();
export default allergyService;
