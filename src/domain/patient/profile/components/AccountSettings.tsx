import { LogOut, Trash, X } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { removeToken } from "@/common/utils/auth";
import { useLogout, useDeleteAccount } from "../queries";
import useTheme from "@/common/hooks/useTheme";
import Modal from "react-native-modal";
import Button from "@/shared/components/Button";
import { useState } from "react";

const AccountSettings = () => {
  const { t } = useTranslation();
  const { text } = useTheme();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const [showLogout, setShowLogout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isPending = isLoggingOut || isDeleting;

  const handleLogoutConfirm = () => {
    logout(undefined, {
      onSuccess: async () => {
        await removeToken();
        router.replace("/");
      },
      onError: async () => {
        await removeToken();
        router.replace("/");
      },
      onSettled: () => {
        setShowLogout(false);
      }
    });
  };

  const handleDeleteConfirm = () => {
    deleteAccount(undefined, {
      onSuccess: async () => {
        await removeToken();
        router.replace("/");
      },
      onError: async () => {
        await removeToken();
        router.replace("/");
      },
      onSettled: () => {
        setShowDelete(false);
      }
    });
  };

  return (
    <View className="mt-8">
      <Pressable
        className="p-3 rounded-full bg-red-700 flex-row justify-center items-center gap-2 disabled:opacity-40"
        onPress={() => setShowLogout(true)}
        disabled={isPending}
      >
        <LogOut color="white" size={21} />
        <Text className="text-white font-medium">{t("profile.logout")}</Text>
      </Pressable>
      <Pressable
        className="p-3 rounded-full border border-red-600 mt-4 flex-row justify-center items-center gap-2 disabled:opacity-40"
        onPress={() => setShowDelete(true)}
        disabled={isPending}
      >
        <Trash color="red" size={21} />
        <Text className="text-red-500 font-medium">
          {t("profile.deleteAccount")}
        </Text>
      </Pressable>

      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        backdropColor={"#0C0C0C"}
        onBackButtonPress={() => setShowLogout(false)}
        onBackdropPress={() => setShowLogout(false)}
        isVisible={showLogout}
      >
        <View className="bg-background">
          <View className="relative bg-surface py-3 px-2 items-center">
            <Text className="text-md text-text-primary font-medium">
              {t("profile.logout")}
            </Text>
            <View className="absolute top-3 right-4">
              <Pressable onPress={() => setShowLogout(false)}>
                <X color={text.secondary} />
              </Pressable>
            </View>
          </View>
          <View className="px-4 mt-8">
            <Text className="text-md font-medium text-text-primary">
              {t("actions.logoutConfirm") ?? "Are you sure you want to logout?"}
            </Text>
          </View>
          <View className="px-4 mt-8 pb-6 gap-3">
            <Button
              text={t("profile.logout")}
              onPress={handleLogoutConfirm}
              disabled={isPending}
            />
            <Button
              text={t("actions.cancel")}
              variant="outline"
              onPress={() => setShowLogout(false)}
              disabled={isPending}
            />
          </View>
        </View>
      </Modal>

      <Modal
        style={{ justifyContent: "flex-end", margin: 0 }}
        backdropColor={"#0C0C0C"}
        onBackButtonPress={() => setShowDelete(false)}
        onBackdropPress={() => setShowDelete(false)}
        isVisible={showDelete}
      >
        <View className="bg-background">
          <View className="relative bg-surface py-3 px-2 items-center">
            <Text className="text-md text-text-primary font-medium">
              {t("profile.deleteAccount")}
            </Text>
            <View className="absolute top-3 right-4">
              <Pressable onPress={() => setShowDelete(false)}>
                <X color={text.secondary} />
              </Pressable>
            </View>
          </View>
          <View className="px-4 mt-8">
            <Text className="text-md font-medium text-text-primary">
              {t("actions.deleteConfirm") ??
                "Are you sure you want to delete your account? This action cannot be undone."}
            </Text>
          </View>
          <View className="px-4 mt-8 pb-6 gap-3">
            <Button
              text={t("profile.deleteAccount")}
              onPress={handleDeleteConfirm}
              disabled={isPending}
            />
            <Button
              text={t("actions.cancel")}
              variant="outline"
              onPress={() => setShowDelete(false)}
              disabled={isPending}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountSettings;
