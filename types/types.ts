import { CompleteProfileState } from "../app/auth/complete-profile";

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

export interface UpdateUserData extends Partial<CompleteProfileState> {
    type: string;
}
