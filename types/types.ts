export interface Skill {
    id: string;
    name: string;
}

export interface Strength {
    id: string;
    description: string;
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
    skills: Skill[];
    strengths: Strength[];
}
