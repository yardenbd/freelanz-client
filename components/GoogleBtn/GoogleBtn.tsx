import React from "react";
import { Pressable } from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { commonStyles } from "../../scripts/styles";
import * as AppleAuthentication from "expo-apple-authentication";
import { SsoButtonProps } from "../AppleBtn/AppleBtn";

export const GoogleBtn: React.FC<SsoButtonProps> = ({
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

            console.log(appleCredential);
        } catch (error) {
            console.error("Apple Sign-In Error:", error);
        }
    };
    return (
        <Pressable
            style={[commonStyles.ssoBtn, overrideStyle && overrideStyle]}
            onPress={handleAppleSignIn}
        >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <G clipPath="url(#clip0_88_29277)">
                    <Path
                        d="M23.4946 12.2658C23.4946 11.2825 23.4146 10.565 23.2415 9.82092H11.9871V14.2589H18.5932C18.46 15.3618 17.7408 17.0228 16.1425 18.1388L16.1201 18.2874L19.6786 21.0376L19.9251 21.0622C22.1893 18.976 23.4946 15.9066 23.4946 12.2658Z"
                        fill="#4285F4"
                    />
                    <Path
                        d="M11.987 23.9588C15.2234 23.9588 17.9404 22.8958 19.925 21.0622L16.1424 18.1388C15.1302 18.8431 13.7717 19.3347 11.987 19.3347C8.81711 19.3347 6.12671 17.2486 5.16766 14.3652L5.02708 14.3771L1.32695 17.234L1.27856 17.3682C3.24974 21.2747 7.29869 23.9588 11.987 23.9588Z"
                        fill="#34A853"
                    />
                    <Path
                        d="M5.16768 14.3652C4.91462 13.6211 4.76817 12.8238 4.76817 12C4.76817 11.1761 4.91462 10.3789 5.15436 9.6348L5.14766 9.47633L1.40116 6.57361L1.27858 6.63178C0.466166 8.25288 0 10.0733 0 12C0 13.9267 0.466166 15.747 1.27858 17.3681L5.16768 14.3652Z"
                        fill="#FBBC05"
                    />
                    <Path
                        d="M11.987 4.66529C14.2378 4.66529 15.7562 5.63527 16.6219 6.44587L20.0049 3.15054C17.9272 1.22386 15.2234 0.0412598 11.987 0.0412598C7.29869 0.0412598 3.24974 2.72532 1.27856 6.63182L5.15435 9.63485C6.12671 6.75146 8.81711 4.66529 11.987 4.66529Z"
                        fill="#EB4335"
                    />
                </G>
                <Defs>
                    <ClipPath id="clip0_88_29277">
                        <Rect width="24" height="24" fill="white" />
                    </ClipPath>
                </Defs>
            </Svg>
        </Pressable>
    );
};
