import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { commonStyles } from "../../scripts/styles";
import * as AppleAuthentication from "expo-apple-authentication";

export interface SsoButtonProps {
    onAppleSignIn: (
        credential: AppleAuthentication.AppleAuthenticationCredential
    ) => void;
    overrideStyle?: any;
}
export const AppleBtn: React.FC<SsoButtonProps> = ({
    onAppleSignIn,
    overrideStyle,
}) => {
    const handleAppleSignIn = async () => {
        try {
            const appleCredential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            onAppleSignIn(appleCredential);
        } catch (error) {
            console.error("Apple Sign-In Error:", error);
        }
    };
    return (
        <Pressable
            style={[commonStyles.ssoBtn, overrideStyle && overrideStyle]}
            onPress={handleAppleSignIn}
        >
            <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <Path
                    d="M17.2851 0H17.4558C17.5928 1.69253 16.9468 2.95719 16.1616 3.87301C15.3912 4.78251 14.3363 5.6646 12.6301 5.53076C12.5162 3.86247 13.1633 2.69161 13.9474 1.77789C14.6746 0.92636 16.0078 0.168621 17.2851 0ZM22.4501 17.6167V17.6641C21.9706 19.1163 21.2866 20.361 20.452 21.516C19.69 22.5646 18.7563 23.9758 17.089 23.9758C15.6484 23.9758 14.6915 23.0494 13.215 23.0241C11.6531 22.9988 10.7942 23.7987 9.3662 24H8.87931C7.8307 23.8482 6.98443 23.0178 6.36791 22.2695C4.54997 20.0585 3.14515 17.2025 2.88379 13.5476V12.4737C2.99445 9.85799 4.26543 7.73126 5.95479 6.70057C6.84638 6.15255 8.07204 5.68568 9.43681 5.89435C10.0217 5.98498 10.6193 6.18522 11.143 6.38335C11.6394 6.5741 12.2602 6.9124 12.8482 6.89448C13.2466 6.88289 13.6428 6.67527 14.0444 6.52878C15.2205 6.10407 16.3734 5.61718 17.8931 5.84587C19.7195 6.12199 21.0158 6.93347 21.8167 8.18548C20.2717 9.16875 19.0503 10.6505 19.259 13.1809C19.4445 15.4794 20.7808 16.8241 22.4501 17.6167Z"
                    fill="black"
                />
            </Svg>
        </Pressable>
    );
};
