import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "../store/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }} />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 25,
    },
});
