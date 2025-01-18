import * as ImagePicker from "expo-image-picker";

export interface ISkillOrStrength {
    id: number;
    he: string;
    ru: string;
    ar: string;
    en: string;
}

export interface IAuthentictedResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface User {
    name: string;
    address: string;
    email: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    dateOfBirth: string;
    role: string;
    isPhoneVerified: boolean;
    type: "Employee" | "Business";
    gender: "male" | "female";
    businessNumber: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    skills: ISkillOrStrength[];
    strengths: ISkillOrStrength[];
}

export interface CompleteProfileState {
    profileImg: null | Partial<ImagePicker.ImagePickerAsset>;
    name: string;
    email: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
    type: string;
    skills: number[];
    strengths: number[];
    latitude: number;
    longitude: number;
}

export interface IJob {
    ID: number;
    title: string;
    tools_required: string;
    instructions: string;
    description: string;
    employee_amount: number;
    payment: number;
    longitude: number;
    latitude: number;
    address: string;
    status: string;
    date_start: string;
    date_end: string;
    skills: ISkillOrStrength[];
    strength: ISkillOrStrength[];
    user: User;
    user_id: number;
}

export interface JobRecommendation {
    id: number;
    jobTitle: string;
    jobPayment: number;
    jobAddress: string;
    distance: number;
    matchingSkills: number;
    totalJobSkills: number;
    matchingStrengths: number;
    totalJobStrengths: number;
    jobSkills: string;
    jobStrengths: string;
    userName: string;
    jobDateStart: string;
    bg: string;
}
export interface FilterState {
    date: string;
    budget: [number, number];
    range: number;
}
