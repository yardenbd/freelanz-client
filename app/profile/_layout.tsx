import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { BackwardsBtn } from "../../components/BackwardsBtn/BackwardsBtn";
import { ProfileProgressBar } from "../../components/ProfileProgressBar/ProfileProgressBar";
import { commonStyles } from "../../scripts/styles";
import { StepsProvider, useSteps } from "../../context/StepsContext";

const Layout = () => {
    return (
        <StepsProvider>
            <SafeAreaView style={commonStyles.safeArea}>
                <View style={commonStyles.container}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 20,
                            marginBottom: 35,
                            marginTop: 10,
                        }}
                    >
                        <BackwardsBtn cancelStyles fromSteps />
                        <ProfileProgressBar />
                    </View>
                    <Slot />
                </View>
            </SafeAreaView>
        </StepsProvider>
    );
};

export default Layout;
