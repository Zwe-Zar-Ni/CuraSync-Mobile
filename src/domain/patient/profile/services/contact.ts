// import { httpClient } from "@/common/api/apiClient";
// import { Contact } from "../types/contact";
import { ContactSchema, UpdateContactSchema } from "../validations/contact";
import { contactStore } from "./dummy";

const toNullable = (value: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

class ContactService {
  async getContacts() {
    return contactStore.list();
    // const response = await httpClient.get<Contact[]>("/patients/contacts");
    // return response.data;
  }

  async createContact(input: ContactSchema) {
    const payload = {
      name: input.name.trim(),
      phone_number: input.phone_number.trim(),
      email: toNullable(input.email),
      address: toNullable(input.address)
    };
    return contactStore.create(payload);
    // const response = await httpClient.post<Contact>(
    //   "/patients/contacts",
    //   payload
    // );
    // return response.data;
  }

  async updateContact({ id, ...input }: UpdateContactSchema) {
    const payload = {
      name: input.name.trim(),
      phone_number: input.phone_number.trim(),
      email: toNullable(input.email),
      address: toNullable(input.address)
    };
    return contactStore.update(id, payload);
    // const response = await httpClient.patch<Contact>(
    //   `/patients/contacts/${id}`,
    //   payload
    // );
    // return response.data;
  }

  async deleteContact(id: number) {
    return contactStore.remove(id);
    // await httpClient.delete(`/patients/contacts/${id}`);
  }
}

const contactService = new ContactService();
export default contactService;
