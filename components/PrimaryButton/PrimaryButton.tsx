import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { commonStyles } from "../../scripts/styles";

interface IPrimaryButtonProps {
    label: string;
    onPress: () => void;
}
export const PrimaryButton: React.FC<IPrimaryButtonProps> = ({
    label,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[commonStyles.largeBtn, { marginTop: "auto" }]}
        >
            <Text style={commonStyles.largebtnText}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({});
