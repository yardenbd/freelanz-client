import { StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

export const commonStyles = StyleSheet.create({
    underscoreLink: {
        textDecorationLine: "underline",
        color: COLORS.blue,
    },
    largebtnText: { color: COLORS.white, textAlign: "center" },
    greySubLabel: {
        color: COLORS.grey,
        fontSize: 16,
        textAlign: "right",
        fontWeight: 400,
        marginTop: 10,
    },
    authLabel: {
        color: COLORS.black,
        fontSize: 36,
        textAlign: "right",
        fontWeight: 700,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        paddingVertical: 13,
        paddingHorizontal: 15,
        width: "100%",
        borderRadius: 10,
        textAlign: "right",
    },
    safeArea: { backgroundColor: COLORS.white, position: "relative" },
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
        height: "100%",
    },
    container: {
        width: "100%",
        paddingHorizontal: 25,
        display: "flex",
        height: "100%",
        backgroundColor: COLORS.white,
    },
    rightText: { textAlign: "right" },
    mediumBlackText: {
        fontSize: 24,
        color: COLORS.black,
        fontWeight: 700,
        textAlign: "center",
    },
});
