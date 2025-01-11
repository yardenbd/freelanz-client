import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { BackwardsBtn } from "../../components/BackwardsBtn/BackwardsBtn";
import { ProfileProgressBar } from "../../components/ProfileProgressBar/ProfileProgressBar";
import { commonStyles } from "../../scripts/styles";
import { StepsProvider, useSteps } from "../../context/StepsContext";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

const Layout = () => {
    return (
        <StepsProvider>
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <TopbarElements />
                    <Slot />
                </View>
            </SafeAreaView>
        </StepsProvider>
    );
};

export default Layout;

const TopbarElements: React.FC = () => {
    const user = useAppSelector((state: RootState) => state.user.user);
    const isUserEmployee = user?.type === "Employee";
    const { prevStep } = useSteps();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                marginBottom: 30,
                marginTop: 10,
                alignItems: "center",
            }}
        >
            <BackwardsBtn cancelStyles prevStep={prevStep} />
            <ProfileProgressBar steps={isUserEmployee ? 5 : 2} />
        </View>
    );
};
