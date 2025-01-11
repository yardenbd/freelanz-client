import React from "react";
import { StyleSheet, View } from "react-native";
import { BackwardsBtn } from "../BackwardsBtn/BackwardsBtn";
import { COLORS } from "../../constants/Colors";
import { useSteps } from "../../context/StepsContext";

interface ProfileProgressBarProps {
    steps: number;
}

export const ProfileProgressBar: React.FC<ProfileProgressBarProps> = ({
    steps,
}) => {
    const { currentStep } = useSteps();

    const stepsToRender = Array.from({ length: steps }, (_, i) => i + 1).map(
        (step) => (
            <View
                key={step}
                style={[styles.step, step === currentStep && styles.activeStep]}
            ></View>
        )
    );
    return <View style={styles.row}>{stepsToRender}</View>;
};

export const styles = StyleSheet.create({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
    },
    step: {
        borderRadius: 5,
        backgroundColor: COLORS.greyBorder,
        height: 5,
        width: 45,
    },
    activeStep: {
        backgroundColor: COLORS.blue,
    },
});
