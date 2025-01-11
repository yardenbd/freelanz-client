import { Slot, usePathname } from "expo-router";
import React from "react";
import {
    Keyboard,
    SafeAreaView,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { BackwardsBtn } from "../../components/BackwardsBtn/BackwardsBtn";
import { commonStyles } from "../../scripts/styles";

const Layout = () => {
    const pathname = usePathname();
    const lastSegment = pathname.split("/").filter(Boolean).pop();

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            {lastSegment !== "sign-in" && <BackwardsBtn />}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={commonStyles.container}>
                    <Slot />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default Layout;
