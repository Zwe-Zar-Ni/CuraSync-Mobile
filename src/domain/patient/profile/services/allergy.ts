import { httpClient } from '@/common/api/apiClient';
import { Allergy } from '../types/allergy';
import { AllergySchema, UpdateAllergySchema } from '../validations/allergy';
import { toNullable } from '@/common/utils/transformers';

class AllergyService {
  async getAllergies() {
    const response = await httpClient.get<Allergy[]>('/patients/allergies');
    return response.data;
  }

  async createAllergy(input: AllergySchema) {
    const payload = {
      name: input.name.trim(),
      severity: input.severity,
      note: toNullable(input.note),
    };
    const response = await httpClient.post<Allergy>(
      '/patients/allergies',
      payload,
    );
    return response.data;
  }

  async updateAllergy({ id, ...input }: UpdateAllergySchema) {
    const payload = {
      name: input.name.trim(),
      severity: input.severity,
      note: toNullable(input.note),
    };
    const response = await httpClient.patch<Allergy>(
      `/patients/allergies/${id}`,
      payload,
    );
    return response.data;
  }

  async deleteAllergy(id: number) {
    await httpClient.delete(`/patients/allergies/${id}`);
  }
}

const allergyService = new AllergyService();
export default allergyService;
