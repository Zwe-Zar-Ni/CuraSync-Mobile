import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Contact } from "../types/contact";
import { ApiError } from "@/common/types";
import contactService from "../services/contact";
import { ContactSchema, UpdateContactSchema } from "../validations/contact";

export const useGetContacts = () => {
  return useQuery<Contact[], ApiError>({
    queryKey: ["patient-contacts"],
    queryFn: contactService.getContacts
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<Contact, ApiError, ContactSchema>({
    mutationKey: ["create-patient-contact"],
    mutationFn: contactService.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-contacts"] });
    }
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<Contact | null, ApiError, UpdateContactSchema>({
    mutationKey: ["update-patient-contact"],
    mutationFn: contactService.updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-contacts"] });
    }
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation<Contact | null, ApiError, number>({
    mutationKey: ["delete-patient-contact"],
    mutationFn: contactService.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-contacts"] });
    }
  });
};
