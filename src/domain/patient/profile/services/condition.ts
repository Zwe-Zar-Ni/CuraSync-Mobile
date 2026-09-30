import { httpClient } from "@/common/api/apiClient";
import { Condition } from "../types/condition";
import {
  ConditionSchema,
  UpdateConditionSchema
} from "../validations/condition";
import { conditionStore } from "./dummy";

const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

class ConditionService {
  async getConditions() {
    return conditionStore.list();
    const response = await httpClient.get<Condition[]>("/patients/conditions");
    return response.data;
  }

  async createCondition(input: ConditionSchema) {
    const payload = {
      name: input.name.trim(),
      diagnosis_date: toNullable(input.diagnosis_date),
      status: input.status,
      note: toNullable(input.note)
    };
    return conditionStore.create(payload);
    const response = await httpClient.post<Condition>(
      "/patients/conditions",
      payload
    );
    return response.data;
  }

  async updateCondition({ id, ...input }: UpdateConditionSchema) {
    const payload = {
      name: input.name.trim(),
      diagnosis_date: toNullable(input.diagnosis_date),
      status: input.status,
      note: toNullable(input.note)
    };
    return conditionStore.update(id, payload);
    const response = await httpClient.patch<Condition>(
      `/patients/conditions/${id}`,
      payload
    );
    return response.data;
  }

  async deleteCondition(id: number) {
    return conditionStore.remove(id);
    await httpClient.delete(`/patients/conditions/${id}`);
  }
}

const conditionService = new ConditionService();
export default conditionService;