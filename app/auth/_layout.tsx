import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { BackwardsBtn } from "../../components/BackwardsBtn/BackwardsBtn";
import { commonStyles } from "../../scripts/styles";

const Layout = () => {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View>
                <BackwardsBtn />
                <Slot />
            </View>
        </SafeAreaView>
    );
};

export default Layout;
