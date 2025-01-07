import { StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

export const commonStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        paddingVertical: 13,
        paddingHorizontal: 15,
        width: "100%",
        borderRadius: 10,
        textAlign: "right",
    },
    ssoBtn: {
        width: "100%",
        paddingVertical: 18,
        borderRadius: 14,
        textAlign: "center",
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        display: "flex",
        alignItems: "center",
    },

    largeBtn: {
        backgroundColor: COLORS.blue,
        width: "100%",
        paddingVertical: 18,
        borderRadius: 10,
        textAlign: "center",
    },
    centerContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    container: {
        width: "100%",
        paddingHorizontal: 25,
        display: "flex",
        height: "100%",
    },
});
