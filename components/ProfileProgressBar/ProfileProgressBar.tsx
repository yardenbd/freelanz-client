import React from "react";
import { StyleSheet, View } from "react-native";
import { BackwardsBtn } from "../BackwardsBtn/BackwardsBtn";
import { COLORS } from "../../constants/Colors";
import { useSteps } from "../../context/StepsContext";

export const ProfileProgressBar = () => {
    const { currentStep } = useSteps();

    const stepsToRender = [1, 2, 3, 4, 5].map((step) => (
        <View
            key={step}
            style={[styles.step, step === currentStep && styles.activeStep]}
        ></View>
    ));
    return <View style={styles.row}>{stepsToRender}</View>;
};

export const styles = StyleSheet.create({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
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
