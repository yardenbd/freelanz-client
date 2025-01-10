import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../constants/Colors";

export const Checkbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <TouchableOpacity
            onPress={toggleCheckbox}
            style={[isChecked ? styles.checked : styles.notChecked]}
        >
            {isChecked && <Icon name="check" size={16} color="#fff" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    notChecked: {
        width: 20,
        height: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.blue,
    },
    checked: {
        width: 20,
        height: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.blue,
        backgroundColor: COLORS.blue,
    },
});
