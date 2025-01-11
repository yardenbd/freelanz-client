import { Slot, usePathname } from "expo-router";
import React from "react";
import {
    Button,
    Keyboard,
    Pressable,
    SafeAreaView,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { BackwardsBtn } from "../../components/BackwardsBtn/BackwardsBtn";
import { ProfileProgressBar } from "../../components/ProfileProgressBar/ProfileProgressBar";
import { commonStyles } from "../../scripts/styles";
import { StepsProvider, useSteps } from "../../context/StepsContext";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";

const Layout = () => {
    return (
        <StepsProvider>
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={commonStyles.safeArea}>
                    <View style={commonStyles.container}>
                        <TopbarElements />
                        <Slot />
                    </View>
                </SafeAreaView>
            </TouchableNativeFeedback>
        </StepsProvider>
    );
};

export default Layout;

const TopbarElements: React.FC = () => {
    const user = useAppSelector((state: RootState) => state.user.user);
    const isUserEmployee = user?.type === "Employee";
    const { prevStep, nextStep } = useSteps();
    const { t } = useTranslation();
    const pathname = usePathname();
    if (!user) return null;
    console.log(pathname);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: 30,
                marginTop: 10,
                alignItems: "center",
            }}
        >
            <BackwardsBtn cancelStyles prevStep={prevStep} />
            <ProfileProgressBar steps={isUserEmployee ? 5 : 2} />
            <Pressable onPress={nextStep}>
                <Text style={{ color: COLORS.blue, fontSize: 16 }}>
                    {t("skip")}
                </Text>
            </Pressable>
        </View>
    );
};
