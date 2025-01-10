import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AppleAuthentication from "expo-apple-authentication";
import {
    IAuthentictedResponse,
    UpdateUserData,
    User,
} from "../../../types/types";
import { apiClient } from "../../../apiClient";
import { deleteTokens, saveToken } from "../../../secureStorage";
import { CompleteProfileState } from "../../../app/auth/complete-profile";

export const authenticateWithApple = createAsyncThunk<
    User,
    AppleAuthentication.AppleAuthenticationCredential
>(
    "auth/authenticateWithApple",
    async (
        credential: AppleAuthentication.AppleAuthenticationCredential,
        { rejectWithValue }
    ) => {
        try {
            const response = await apiClient.post<IAuthentictedResponse>(
                "/auth/apple",
                credential
            );
            await saveToken("accessToken", response.data.accessToken);
            await saveToken("refreshToken", response.data.refreshToken);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);

export const updateUser = createAsyncThunk<User, UpdateUserData>(
    "auth/updateUser",
    async (data: UpdateUserData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(data)) {
                if (key === "profileImg") {
                    formData.append("file", value);
                } else formData.append(key, value);
            }
            const response = await apiClient.patch<User>("/user", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);
