import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  ArrowUpRight,
  Calendar,
  Monitor,
  MoreVertical
} from "lucide-react-native";
import useTheme from "@/common/hooks/useTheme";

const UpcomingConsultation = () => {
  const { text } = useTheme();
  return (
    <View className="p-4 rounded-2xl border border-border bg-surface">
      <View className="flex-row gap-2">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12Y4yRJOMGIw__Zmc5zT16Ci_9w3_EMoH2FGP20yHew&s=10"
          className="w-16 h-16 rounded-full"
          resizeMode="cover"
          width={64}
          height={64}
        />
        <View>
          <Text className="text-xl     font-semibold text-text-primary">
            Dr. Madam Curie
          </Text>
          <Text className="font-medium text-text-secondary">Cardiologist</Text>
        </View>
      </View>
      <View className="mt-4">
        <View className="flex-row">
          <View className="flex-1">
            <View className="flex-row gap-2 items-center">
              <Calendar color={text.secondary} size={18} />
              <Text className="text-text-secondary font-medium">
                2026-09-30 at 10:00 AM
              </Text>
            </View>
            <View className="flex-row mt-1 gap-2 items-center">
              <Monitor color={text.secondary} size={18} />
              <Text className="text-text-secondary font-medium">
                Virtual Visit
              </Text>
            </View>
          </View>
          <Pressable className="flex-row justify-center items-center rounded-full bg-primary gap-2 p-3">
            <ArrowUpRight color="white" size={18} />
            <Text className="text-white font-medium">More</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpcomingConsultation;
