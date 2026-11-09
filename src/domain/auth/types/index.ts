import { UserProfile } from '@/common/types';

export type AuthResponse = {
  access_token: string;
  expires_in: number;
  profile: null;
  refresh_expires_in: number;
  refresh_token: string;
  role: string;
  token_type: string;
  data: UserProfile;
};
