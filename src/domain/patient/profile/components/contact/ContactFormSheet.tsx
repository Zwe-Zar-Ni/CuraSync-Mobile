import useTheme from "@/common/hooks/useTheme";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useCreateContact, useUpdateContact } from "../../queries/contact";
import type { Contact } from "../../types/contact";
import {
  ContactValidator,
  type ContactSchema
} from "../../validations/contact";

type Props = {
  isVisible: boolean;
  contact?: Contact | null;
  onClose: () => void;
};

const ContactFormSheet = ({ isVisible, contact = null, onClose }: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate: create, isPending: isCreating } = useCreateContact();
  const { mutate: update, isPending: isUpdating } = useUpdateContact();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactSchema>({
    resolver: zodResolver(ContactValidator),
    defaultValues: {
      name: "",
      phone_number: "",
      email: null,
      address: null
    }
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({
      name: contact?.name ?? "",
      phone_number: contact?.phone_number ?? "",
      email: contact?.email ?? null,
      address: contact?.address ?? null
    });
  }, [isVisible, contact, reset]);

  const onSubmit = (data: ContactSchema) => {
    const options = {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    };

    if (contact) {
      update({ id: contact.id, ...data }, options);
      return;
    }

    create(data, options);
  };

  return (
    <Modal
      style={{ justifyContent: "flex-end", margin: 0 }}
      backdropColor={"#0C0C0C"}
      avoidKeyboard
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={isVisible}
    >
      <View className="bg-background">
        <View className="relative bg-surface py-3 px-2 items-center">
          <Text className="text-md text-text-primary font-medium">
            {contact ? t("contacts.edit") : t("contacts.add")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-4"
        >
          <View className="gap-4 py-6">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("labels.name")}
                  placeholder="Full Name"
                  error={errors.name ? errors.name.message : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="phone_number"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("labels.phoneNumber")}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  error={
                    errors.phone_number
                      ? errors.phone_number.message
                      : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={(next) => onChange(next.length ? next : null)}
                  label={t("labels.email")}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email ? errors.email.message : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={(next) => onChange(next.length ? next : null)}
                  label={t("contacts.address")}
                  placeholder="Address"
                  error={errors.address ? errors.address.message : undefined}
                />
              )}
            />
          </View>
        </ScrollView>
        <View className="px-4 pb-6 gap-3">
          <Button
            text={t("actions.save")}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPending}
          />
          <Button
            text={t("actions.cancel")}
            variant="outline"
            onPress={onClose}
            disabled={isSubmitting || isPending}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ContactFormSheet;
