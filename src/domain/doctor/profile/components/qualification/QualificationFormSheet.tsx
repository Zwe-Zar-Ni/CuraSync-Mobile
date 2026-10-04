import useTheme from "@/common/hooks/useTheme";
import type { ApiError } from "@/common/types";
import Button from "@/shared/components/Button";
import TextField from "@/shared/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import {
  useCreateQualification,
  useUpdateQualification
} from "../../queries/qualification";
import type { Qualification } from "../../types/qualification";
import {
  QualificationValidator,
  type QualificationSchema
} from "../../validations/qualification";
import YearPickerField from "@/shared/components/YearPickerField";

type Props = {
  isVisible: boolean;
  qualification?: Qualification | null;
  onClose: () => void;
};

const QualificationFormSheet = ({
  isVisible,
  qualification = null,
  onClose
}: Props) => {
  const { text } = useTheme();
  const { t } = useTranslation();

  const { mutate: create, isPending: isCreating } = useCreateQualification();
  const { mutate: update, isPending: isUpdating } = useUpdateQualification();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QualificationSchema>({
    resolver: zodResolver(QualificationValidator),
    defaultValues: {
      name: "",
      institution: "",
      year: new Date().getFullYear(),
      certificate_url: null
    }
  });

  useEffect(() => {
    if (!isVisible) return;
    reset({
      name: qualification?.name ?? "",
      institution: qualification?.institution ?? "",
      year: qualification ? qualification.year : new Date().getFullYear(),
      certificate_url: qualification?.certificate_url ?? null
    });
  }, [isVisible, qualification, reset]);

  const onSubmit = (data: QualificationSchema) => {
    const options = {
      onSuccess: () => onClose(),
      onError: (error: ApiError) => {
        console.log(error);
      }
    };

    if (qualification) {
      update({ id: qualification.id, ...data }, options);
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
            {qualification ? t("qualifications.edit") : t("qualifications.add")}
          </Text>
          <View className="absolute top-3 right-4">
            <Pressable onPress={onClose}>
              <X color={text.secondary} />
            </Pressable>
          </View>
        </View>
        <View className="px-4">
          <View className="gap-4 py-6">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("qualifications.qualificationName")}
                  placeholder="E.g. MBBS, MD, MS"
                  error={errors.name ? errors.name.message : undefined}
                />
              )}
            />

            <Controller
              control={control}
              name="institution"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("qualifications.institution")}
                  placeholder="E.g. Harvard University"
                  error={
                    errors.institution ? errors.institution.message : undefined
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="year"
              render={({ field: { onChange, onBlur, value } }) => (
                <YearPickerField value={Number(value)} onChange={onChange} />
              )}
            />

            <Controller
              control={control}
              name="certificate_url"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value ?? ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label={t("qualifications.certificateUrl")}
                  placeholder="E.g. https://example.com/certificate.pdf"
                  autoCapitalize="none"
                  keyboardType="url"
                  error={
                    errors.certificate_url
                      ? errors.certificate_url.message
                      : undefined
                  }
                />
              )}
            />
          </View>
        </View>
        <View className="px-4 pb-6 gap-3 flex-row">
          <Button
            text={t("actions.cancel")}
            variant="outline"
            onPress={onClose}
            disabled={isSubmitting || isPending}
            className="flex-1"
          />
          <Button
            text={t("actions.save")}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPending}
            className="flex-1"
          />
        </View>
      </View>
    </Modal>
  );
};

export default QualificationFormSheet;
