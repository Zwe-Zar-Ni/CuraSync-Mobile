import { httpClient } from '@/common/api/apiClient';
import { Contact } from '../types/contact';
import { ContactSchema, UpdateContactSchema } from '../validations/contact';
import { toNullable } from '@/common/utils/transformers';

class ContactService {
  async getContacts() {
    const response = await httpClient.get<Contact[]>('/patients/contacts');
    return response.data;
  }

  async createContact(input: ContactSchema) {
    const payload = {
      name: input.name.trim(),
      phone_number: input.phone_number.trim(),
      email: toNullable(input.email),
      address: toNullable(input.address),
    };
    const response = await httpClient.post<Contact>(
      '/patients/contacts',
      payload,
    );
    return response.data;
  }

  async updateContact({ id, ...input }: UpdateContactSchema) {
    const payload = {
      name: input.name.trim(),
      phone_number: input.phone_number.trim(),
      email: toNullable(input.email),
      address: toNullable(input.address),
    };
    const response = await httpClient.patch<Contact>(
      `/patients/contacts/${id}`,
      payload,
    );
    return response.data;
  }

  async deleteContact(id: number) {
    await httpClient.delete(`/patients/contacts/${id}`);
  }
}

const contactService = new ContactService();
export default contactService;
