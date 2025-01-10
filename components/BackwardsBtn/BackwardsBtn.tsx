import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSteps } from "../../context/StepsContext";

interface IBackwardsBtnProps {
    cancelStyles?: boolean;
    prevStep?: () => void;
}

export const BackwardsBtn: React.FC<IBackwardsBtnProps> = ({
    cancelStyles,
    prevStep,
}) => {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => {
                router.back();
                prevStep?.();
            }}
            style={!cancelStyles && styles.backLink}
        >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                    d="M9.57 5.93005L3.5 12.0001L9.57 18.0701"
                    stroke="#262626"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M20.4999 12H3.66992"
                    stroke="#262626"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    backLink: {
        position: "absolute",
        left: 25,
    },
});
