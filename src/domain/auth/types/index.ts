import { UserProfile } from "@/common/types";

export type AuthResponse = {
  token: string;
  user: UserProfile;
};
