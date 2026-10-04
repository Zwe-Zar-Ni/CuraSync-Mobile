export type PatinationMeta = {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  hasMorePages: boolean;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PatinationMeta;
};

export type ApiError = {
  data: {
    message: string;
    data: [];
    errors: {
      string: string[];
    };
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  profile_url: string | null;
};

export type DoctorProfile = {
  id: number;
  status: string;
  license_number: string | null;
  standard_consultation_fee: number | null;
  bio: string | null;
  total_patient_count: number;
  rating_count: number;
  average_rating: number;
};

export type PatientProfile = {
  id: number;
  date_of_birth: string | null;
  gender: "M" | "F" | null;
  blood_type: string | null;
};

export type Doctor = {
  user: User;
  role: "doctor";
  profile: DoctorProfile;
};

export type Patient = {
  user: User;
  role: "patient";
  profile: PatientProfile;
};

export type UserProfile = Doctor | Patient;

export type Specialization = {
  id: number;
  name: string;
  description: string | null;
  icon_url: string | null;
  doctors_count: number;
};
