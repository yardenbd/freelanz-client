import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const saveToken = async (key: string, token: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync(key, token);
    } catch (error) {
        console.error("Error saving tokens:", error);
    }
};

export const getToken = async (key: string): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
};

export const deleteTokens = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
        console.error("Error deleting tokens:", error);
    }
};
