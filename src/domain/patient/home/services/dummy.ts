import { PaginatedResponse, PatinationMeta } from "@/common/types";
import { Doctor, Specialization } from "../types";

export const specs = [
  {
    id: 11,
    name: "Cardiology",
    description:
      "Diagnoses and treats diseases of the heart, blood vessels and circulation. Covers chest pain, hypertension, heart failure, arrhythmias, heart attack and cardiac imaging such as ECG and echocardiogram.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 12,
    name: "Dermatology",
    description:
      "Care for skin, hair and nail conditions including acne, eczema, psoriasis, rashes, infections and skin cancer. Performs skin checks, biopsies and cosmetic dermatology.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 13,
    name: "Endocrinology",
    description:
      "Manages hormones and metabolic disorders such as diabetes, thyroid disease, PCOS and osteoporosis. Handles insulin, thyroid medication and hormone replacement therapy.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 14,
    name: "Gastroenterology",
    description:
      "Treats the digestive tract, including the oesophagus, stomach, intestines, liver, pancreas and gallbladder. Addresses acidity, IBS, ulcers, hepatitis, gallstones and colonoscopy.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 15,
    name: "Neurology",
    description:
      "Specializes in the brain, spinal cord, nerves and muscles. Treats migraine, epilepsy, stroke, neuropathy, Parkinson disease and multiple sclerosis with EEG and brain imaging.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 16,
    name: "Obstetrics & Gynecology",
    description:
      "Covers pregnancy, childbirth, fertility and women\u2019s reproductive health. Includes antenatal care, deliveries, contraception, PCOS, menstrual disorders and cervical screening.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 17,
    name: "Orthopedics",
    description:
      "Cares for bones, joints, ligaments, tendons and the spine. Manages fractures, arthritis, joint replacement, sports injuries, scoliosis and physiotherapy planning.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 1
  },
  {
    id: 18,
    name: "Pediatrics",
    description:
      "Medical care for infants, children and adolescents, from newborn checkups to growth monitoring. Treats childhood infections, asthma, allergies, vaccinations and developmental concerns.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 0
  },
  {
    id: 19,
    name: "Psychiatry",
    description:
      "Diagnosis and treatment of mental health conditions including depression, anxiety, bipolar disorder, schizophrenia and eating disorders. Provides counselling, medication management and psychological therapy.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 0
  },
  {
    id: 20,
    name: "Pulmonology",
    description:
      "Specializes in the lungs and airways, treating asthma, COPD, pneumonia, tuberculosis, bronchitis and sleep apnea. Performs lung function tests, chest imaging and long-term breathing care.",
    icon_url: "http://localhost:8000/heart.png",
    doctors_count: 0
  }
] as Specialization[];

export const docs = {
  data: [
    {
      id: 1,
      name: "Dr. Leon Kennedy",
      email: "leon@gmail.com",
      phone_number: "0987654321",
      profile_url: "http:\/\/localhost:8000\/doctor.jpeg",
      license_number: "123456789",
      standard_consultation_fee: 25000,
      bio: "Doctor. Listener. Lifelong learner.",
      total_patient_count: 75,
      rating_count: 45,
      average_rating: 4.5,
      specilizations: [
        {
          name: "Cardiology",
          description:
            "Diagnoses and treats diseases of the heart, blood vessels and circulation. Covers chest pain, hypertension, heart failure, arrhythmias, heart attack and cardiac imaging such as ECG and echocardiogram.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        },
        {
          name: "Dermatology",
          description:
            "Care for skin, hair and nail conditions including acne, eczema, psoriasis, rashes, infections and skin cancer. Performs skin checks, biopsies and cosmetic dermatology.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        }
      ]
    },
    {
      id: 2,
      name: "Dr. Ada Wong",
      email: "ada@gmail.com",
      phone_number: "0987654321",
      profile_url: "http:\/\/localhost:8000\/doctor.jpeg",
      license_number: "123456789",
      standard_consultation_fee: 30000,
      bio: "Focused on healing and helping others",
      total_patient_count: 60,
      rating_count: 50,
      average_rating: 4.2,
      specilizations: [
        {
          name: "Endocrinology",
          description:
            "Manages hormones and metabolic disorders such as diabetes, thyroid disease, PCOS and osteoporosis. Handles insulin, thyroid medication and hormone replacement therapy.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        }
      ]
    },
    {
      id: 3,
      name: "Dr. Kim",
      email: "kim@gmail.com",
      phone_number: "0987654321",
      profile_url: "http:\/\/localhost:8000\/doctor.jpeg",
      license_number: "123456789",
      standard_consultation_fee: 18000,
      bio: "Science, care, and steady hands",
      total_patient_count: 120,
      rating_count: 80,
      average_rating: 4.8,
      specilizations: [
        {
          name: "Gastroenterology",
          description:
            "Treats the digestive tract, including the oesophagus, stomach, intestines, liver, pancreas and gallbladder. Addresses acidity, IBS, ulcers, hepatitis, gallstones and colonoscopy.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        }
      ]
    },
    {
      id: 4,
      name: "Johnny Depp",
      email: "john@gmail.com",
      phone_number: "0987654321",
      profile_url: "http:\/\/localhost:8000\/doctor.jpeg",
      license_number: "123456789",
      standard_consultation_fee: 35000,
      bio: "Passion for people, path, and purpose",
      total_patient_count: 150,
      rating_count: 100,
      average_rating: 4.7,
      specilizations: []
    },
    {
      id: 5,
      name: "Dr. Curie",
      email: "curie@gmail.com",
      phone_number: "0987654321",
      profile_url: "http:\/\/localhost:8000\/doctor.jpeg",
      license_number: "123456789",
      standard_consultation_fee: 40000,
      bio: "Medicine is my mission \ud83c\udf1f",
      total_patient_count: 240,
      rating_count: 160,
      average_rating: 4.1,
      specilizations: [
        {
          name: "Orthopedics",
          description:
            "Cares for bones, joints, ligaments, tendons and the spine. Manages fractures, arthritis, joint replacement, sports injuries, scoliosis and physiotherapy planning.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        }
      ]
    },
    {
      id: 6,
      name: "Dr. Allison Burgers",
      email: "allison@gmail.com",
      phone_number: null,
      profile_url: null,
      license_number: "123456789",
      standard_consultation_fee: 25000,
      bio: "Driven by care, grounded in science",
      total_patient_count: 135,
      rating_count: 85,
      average_rating: 4.8,
      specilizations: [
        {
          name: "Neurology",
          description:
            "Specializes in the brain, spinal cord, nerves and muscles. Treats migraine, epilepsy, stroke, neuropathy, Parkinson disease and multiple sclerosis with EEG and brain imaging.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        }
      ]
    },
    {
      id: 7,
      name: "Jessica Jones",
      email: "jessica@gmail.com",
      phone_number: null,
      profile_url: null,
      license_number: "123456789",
      standard_consultation_fee: 20000,
      bio: null,
      total_patient_count: 180,
      rating_count: 80,
      average_rating: 4.5,
      specilizations: [
        {
          name: "Obstetrics & Gynecology",
          description:
            "Covers pregnancy, childbirth, fertility and women\u2019s reproductive health. Includes antenatal care, deliveries, contraception, PCOS, menstrual disorders and cervical screening.",
          icon_url: "http:\/\/localhost:8000\/heart.png"
        }
      ]
    }
  ] as Doctor[],
  meta: {
    currentPage: 1,
    perPage: 15,
    total: 7,
    lastPage: 1,
    hasMorePages: false,
    nextPageUrl: null,
    previousPageUrl: null
  } as PatinationMeta
} as PaginatedResponse<Doctor>;
