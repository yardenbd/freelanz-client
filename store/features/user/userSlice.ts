import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    authenticateWithApple,
    loadUser,
    updateUser,
    uploadDocuments,
} from "./actions";
import { User } from "../../../types/types";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateWithApple.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                authenticateWithApple.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                }
            )
            .addCase(authenticateWithApple.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Authentication failed";
            });
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                }
            )
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unable to update user";
            });
        builder
            .addCase(uploadDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                uploadDocuments.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                }
            )
            .addCase(uploadDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unable to update user";
            });
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loadUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                }
            )
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unable to update user";
            });
    },
});

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
