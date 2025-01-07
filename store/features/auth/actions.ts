import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AppleAuthentication from "expo-apple-authentication";
import { IAuthentictedResponse, User } from "../../../types/types";
import { apiClient } from "../../../apiClient";
import { saveToken } from "../../../secureStorage";

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
