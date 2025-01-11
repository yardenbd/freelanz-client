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
