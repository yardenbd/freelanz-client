import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../constants/Colors";
import Svg, { Path } from "react-native-svg";
import { ModalComponent } from "../Modal/Modal";

interface IDatePickerProps {
    onSelect: (value: string) => void;
    date: string;
}
export const DatePicker: React.FC<IDatePickerProps> = ({ onSelect, date }) => {
    const [showPicker, setShowPicker] = useState(false);
    const { t } = useTranslation();

    const handleChange = (event: any, date?: Date) => {
        setShowPicker(Platform.OS === "ios");
        if (date) {
            onSelect(date.toISOString());
        }
    };

    const dismissKeyboardAndPicker = () => {
        setShowPicker(false);
    };

    const renderDatePicker = showPicker && (
        <ModalComponent
            closeModal={() => setShowPicker(false)}
            visible={showPicker}
        >
            (
            <DateTimePicker
                value={date ? new Date(date) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleChange}
                maximumDate={new Date()}
                style={{ width: "100%", margin: "auto" }}
            />
            )
        </ModalComponent>
    );

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboardAndPicker}>
            <View style={styles.container}>
                <Text style={styles.label}>{t("dateOfBirth")}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowPicker(true);
                    }}
                >
                    <View style={styles.inputContainer}>
                        <CalendarIcon />
                        <Text style={styles.dob}>
                            {date
                                ? `${new Date(date)
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0")}/${(
                                      new Date(date).getMonth() + 1
                                  )
                                      .toString()
                                      .padStart(2, "0")}/${new Date(
                                      date
                                  ).getFullYear()}`
                                : ""}
                        </Text>
                    </View>
                </TouchableOpacity>

                {renderDatePicker}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    dob: { textAlign: "right", marginLeft: "auto", color: COLORS.black },
    container: {
        width: "100%",
        position: "relative",
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: COLORS.black,
        textAlign: "right",
        fontWeight: 400,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
});

const CalendarIcon = () => {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <Path
                d="M7.33325 1.83334V4.58334"
                stroke="#262626"
                strokeWidth="1.375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.6667 1.83334V4.58334"
                stroke="#262626"
                strokeWidth="1.375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M3.20825 8.3325H18.7916"
                stroke="#262626"
                strokeWidth="1.375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M19.2499 7.79168V15.5833C19.2499 18.3333 17.8749 20.1667 14.6665 20.1667H7.33321C4.12488 20.1667 2.74988 18.3333 2.74988 15.5833V7.79168C2.74988 5.04168 4.12488 3.20834 7.33321 3.20834H14.6665C17.8749 3.20834 19.2499 5.04168 19.2499 7.79168Z"
                stroke="#262626"
                strokeWidth="1.375"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.3869 12.5583H14.3951"
                stroke="#262626"
                strokeWidth="1.83333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.3868 15.3083H14.3943"
                stroke="#262626"
                strokeWidth="1.83333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10.9958 12.5583H11.004"
                stroke="#262626"
                strokeWidth="1.83333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10.9958 15.3083H11.004"
                stroke="#262626"
                strokeWidth="1.83333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M7.6032 12.5583H7.61143"
                stroke="#262626"
                strokeWidth="1.83333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M7.6032 15.3083H7.61143"
                stroke="#262626"
                strokeWidth="1.83333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
