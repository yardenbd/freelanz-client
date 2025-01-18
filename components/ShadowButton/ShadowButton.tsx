import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../constants/Colors";

interface ShadowButtonProps {
    children?: React.ReactNode;
    onPress: () => void;
}

const ShadowButton: React.FC<ShadowButtonProps> = ({ children, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 14,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
        minWidth: 50,
        height: 48,
    },
});

export default ShadowButton;
