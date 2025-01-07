import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authenticateWithApple } from "./actions";
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

const authSlice = createSlice({
    name: "auth",
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
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
