import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Pressable,
    Modal,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { ModalComponent } from "../Modal/Modal";

interface IDropdownProps {
    selected: string;
    onSelect: (value: string) => void;
}

export const Dropdown: React.FC<IDropdownProps> = ({ selected, onSelect }) => {
    const [open, setIsOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const itemsToRender = ["Male", "Female"].map((item) => (
        <Picker.Item key={item} label={t(item)} value={item} />
    ));
    const renderPicker = open && (
        <ModalComponent closeModal={() => setIsOpen(false)} visible={open}>
            <Picker
                selectedValue={selected}
                onValueChange={(value) => onSelect(value as string)}
            >
                {itemsToRender}
            </Picker>
        </ModalComponent>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{t("gender")}</Text>
            <Pressable
                onPress={() => setIsOpen((prev) => !prev)}
                style={styles.pickerContainer}
            >
                {renderPicker}
                {selected && (
                    <Text style={styles.selectedText}>{t(selected)}</Text>
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: COLORS.black,
        textAlign: "right",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === "ios" ? 8 : 0,
        height: 45,
    },
    inputIOS: {
        fontSize: 16,
        color: "#000",
        paddingVertical: 8,
    },
    inputAndroid: {
        fontSize: 16,
        color: "#000",
    },
    selectedText: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.black,
        textAlign: "right",
    },
});
