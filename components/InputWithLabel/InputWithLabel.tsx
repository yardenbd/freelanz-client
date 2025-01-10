import React from "react";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { COLORS } from "../../constants/Colors";
import { commonStyles } from "../../scripts/styles";

interface InputWithLabelProps {
    label?: string;
    errorMessage?: string; // Optional error message
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    keyboardType: KeyboardTypeOptions;
    secureTextEntry: boolean;
}
export const InputWithLabel: React.FC<InputWithLabelProps> = ({
    label,
    placeholder,
    errorMessage,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry = false,
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[commonStyles.input]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "flex-end",
        gap: 5,
        width: "100%",
    },
    label: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: 400,
    },
});
