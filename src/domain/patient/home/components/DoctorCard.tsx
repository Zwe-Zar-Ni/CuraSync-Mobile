import { ArrowUpRight } from "lucide-react-native";
import { View, Text, Image, Pressable } from "react-native";
import type { Doctor } from "../types";
import DoctorProfile from "@/assets/images/doctor-profile.png";

type Props = {
  doctor: Doctor;
};

const DoctorCard = ({ doctor }: Props) => {
  const { name, profile_url, average_rating, specilizations } = doctor;

  return (
    <View
      className="bg-surface relative pb-12 p-2 rounded-2xl mb-10"
      style={{
        elevation: 1
      }}
    >
      <View className="relative h-40">
        {profile_url && profile_url !== "" ? (
          <Image
            src={profile_url}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
            width={64}
            height={64}
          />
        ) : (
          <Image
            source={DoctorProfile}
            className="w-full h-full rounded-xl"
            resizeMode="stretch"
            width={64}
            height={64}
          />
        )}
        <View className="absolute bottom-2 right-2 bg-surface rounded-full border border-border py-1 px-2">
          <Text className="text-text-secondary font-medium text-sm">
            ★ {average_rating}
          </Text>
        </View>
      </View>
      <Text className="text-text-primary text-xl font-semibold mt-1">
        {name}
      </Text>
      <Text className="text-text-secondary font-medium">
        {specilizations[0]?.name ?? ""}
      </Text>
      <View className="absolute -bottom-7 left-1/2 right-1/2 rounded-full justify-center items-center">
        <Pressable
          className="bg-primary rounded-full w-14 h-14 justify-center items-center border-3 border-background"
          style={{
            elevation: 1
          }}
        >
          <ArrowUpRight color="white" size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default DoctorCard;
