import useTheme from '@/common/hooks/useTheme';
import Button from '@/shared/components/Button';
import TextField from '@/shared/components/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ChevronLeft, GalleryHorizontal } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  EditProfileSchema,
  EditProfileValidator,
} from '../validations/edit-profile';
import { Doctor } from '@/common/types';
import useAuth from '@/common/hooks/useAuth';
import { useUpdateProfile } from '../queries';
import { useUploadAttachment } from '@/common/queries/attachment';
import dayjs from 'dayjs';

const EditProfilePage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { text } = useTheme();

  const { user } = useAuth();
  const { mutate, isPending } = useUpdateProfile();
  const { mutateAsync: uploadAttachment, isPending: isUploadPending } =
    useUploadAttachment();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(EditProfileValidator),
    defaultValues: {
      name: '',
      phone_number: '',
      license_number: '',
      standard_consultation_fee: '',
      bio: '',
      profile_image_id: null,
    },
  });

  const [image, setImage] = useState<string | null>(
    user?.user?.profile_image || null,
  );

  const requestMediaPermission = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      console.error('Permission Required.');
      return false;
    }
    return true;
  };

  const handleChooseFromGallery = async () => {
    const granted = await requestMediaPermission();
    if (!granted) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      console.log(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const fetchFile = async (uriString: string) => {
    const base64Response = await fetch(uriString);
    if (!base64Response.ok) return null;
    const blob = await base64Response.blob();
    const now = dayjs().format('YYYYMMDDHHmmss');
    const filename = `${now}.${mime.getExtension(blob.type)}`;
    return {
      uri: uriString,
      type: mime.getExtension(blob.type) || 'image/jpeg',
      name: filename,
    };
  };

  const onSubmit = async (data: EditProfileSchema) => {
    if (image && image !== user?.user?.profile_image) {
      console.log('is uploading image');
      const formData = new FormData();
      const file = await fetchFile(image);
      formData.append('file', file as any);
      formData.append('type', 'profiles');
      try {
        const response = await uploadAttachment(formData);
        console.log('image upload response - ', response);
        data.profile_image_id = response.id;
        console.log('profile data with image - ', data);
        mutate(data, {
          onSuccess: () => {
            router.back();
          },
          onError: (error) => {
            console.log(error);
          },
        });
      } catch (error) {
        console.log('Error uploading image:', error);
      }
    } else {
      console.log('profile with no image - ', data);
      mutate(data, {
        onSuccess: () => {
          router.back();
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.user.name ?? '',
      phone_number: user.user.phone_number ?? '',
      license_number: (user as Doctor).profile.license_number ?? '',
      standard_consultation_fee:
        (user as Doctor).profile.standard_consultation_fee === null
          ? ''
          : String((user as Doctor).profile.standard_consultation_fee),
      bio: (user as Doctor).profile.bio ?? '',
      profile_image_id: user.user.profile_image_id ?? null,
    });
  }, [user, reset]);

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="mb-4">
        {router.canGoBack() ? (
          <Pressable onPress={() => router.back()} className="mb-4">
            <ChevronLeft color={text.secondary} size={24} />
          </Pressable>
        ) : null}
        <Text className="text-2xl leading-10 font-medium text-text-primary">
          {t('profile.editPersonalInformation')}
        </Text>
        <Text className="font-medium text-text-secondary">
          {t('profile.updatePersonalDetails')}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4 pb-8">
          <Pressable
            className="p-4 border rounded-2xl border-gray-300 dark:border-gray-700 flex-col justify-center items-center gap-2"
            onPress={handleChooseFromGallery}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 60, height: 60 }}
                className="rounded-md"
                resizeMode="contain"
              />
            ) : (
              <View className="bg-gray-100/50 dark:bg-[#155EEF1A] rounded-md p-2.5">
                <GalleryHorizontal />
              </View>
            )}
            <Text className="flex-1 font-semibold text-text-primary">
              Profile Photo
            </Text>
          </Pressable>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value ?? ''}
                onBlur={onBlur}
                onChangeText={onChange}
                label={t('labels.name')}
                placeholder="Enter your name"
                error={errors.name ? errors.name.message : undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value ?? ''}
                onBlur={onBlur}
                onChangeText={onChange}
                label={t('labels.phoneNumber')}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                error={
                  errors.phone_number ? errors.phone_number.message : undefined
                }
              />
            )}
          />

          <Controller
            control={control}
            name="license_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value ?? ''}
                onBlur={onBlur}
                onChangeText={onChange}
                label={t('labels.licenseNumber')}
                placeholder="Enter your license number"
                error={
                  errors.license_number
                    ? errors.license_number.message
                    : undefined
                }
              />
            )}
          />

          <Controller
            control={control}
            name="standard_consultation_fee"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value ?? ''}
                onBlur={onBlur}
                onChangeText={onChange}
                label={t('labels.standardConsultationFee')}
                placeholder="Enter your standard consultation fee"
                keyboardType="numeric"
                error={
                  errors.standard_consultation_fee
                    ? errors.standard_consultation_fee.message
                    : undefined
                }
              />
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value ?? ''}
                onBlur={onBlur}
                onChangeText={onChange}
                label={t('labels.bio')}
                placeholder="Enter your Bio"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                error={errors.bio ? errors.bio.message : undefined}
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            text={t('actions.save')}
            className="mt-4"
            disabled={isSubmitting || isPending || isUploadPending}
          />
          <Button
            onPress={() => router.back()}
            text={t('actions.cancel')}
            variant="outline"
            disabled={isSubmitting || isPending || isUploadPending}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfilePage;
