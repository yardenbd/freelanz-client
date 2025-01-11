import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AppleAuthentication from "expo-apple-authentication";
import {
    CompleteProfileState,
    IAuthentictedResponse,
    User,
} from "../../../types/types";
import { apiClient } from "../../../apiClient";
import { saveToken } from "../../../secureStorage";

export const authenticateWithApple = createAsyncThunk<
    User,
    AppleAuthentication.AppleAuthenticationCredential
>(
    "user/authenticateWithApple",
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

export const updateUser = createAsyncThunk<
    User,
    Partial<CompleteProfileState> | FormData
>(
    "user/updateUser",
    async (
        data: Partial<CompleteProfileState> | FormData,
        { rejectWithValue }
    ) => {
        try {
            const isDataFromData = data instanceof FormData;
            const response = await apiClient.patch<User>("/user", data, {
                headers: {
                    "Content-Type": isDataFromData
                        ? "multipart/form-data"
                        : "application/json",
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

export const uploadDocuments = createAsyncThunk<User, FormData>(
    "user/uploadDocuments",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await apiClient.patch<User>(
                "/user/documents",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);

export const loadUser = createAsyncThunk<User>(
    "user/loadUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get<{ user: User }>(
                "/auth/load-user"
            );
            return response.data.user;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Unknown error"
            );
        }
    }
);
