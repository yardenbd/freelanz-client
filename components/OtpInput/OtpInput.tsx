import React, { useState, useRef } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Keyboard,
    TextInputKeyPressEventData,
    NativeSyntheticEvent,
} from "react-native";
import { COLORS } from "../../constants/Colors";

interface OTPInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number): void => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to the next input field
        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        // Check if OTP is complete
        if (newOtp.every((value) => value !== "") && newOtp.length === length) {
            Keyboard.dismiss(); // Close the keyboard
            if (onComplete) onComplete(newOtp.join(""));
        }
    };

    const handleKeyPress = (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ): void => {
        if (
            event.nativeEvent.key === "Backspace" &&
            otp[index] === "" &&
            index > 0
        ) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((_, index) => (
                <TextInput
                    key={index}
                    style={[
                        styles.input,
                        otp[index] !== "" && styles.filledInput,
                    ]}
                    value={otp[index]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    ref={(ref) => (inputs.current[index] = ref)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 20,
        gap: 10,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        borderRadius: 8,
        textAlign: "center",
        fontSize: 18,
        color: COLORS.black,
    },
    filledInput: {
        borderColor: COLORS.black,
    },
});

export default OTPInput;
