import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AppleAuthentication from "expo-apple-authentication";
import { User } from "../../../types/types";
import { apiClient } from "../../../apiClient";

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
            const response = await apiClient.post<User>(
                "/auth/apple",
                credential
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);
