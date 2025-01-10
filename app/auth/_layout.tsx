import { Slot } from "expo-router";
import React from "react";
import {
    Keyboard,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { BackwardsBtn } from "../../components/BackwardsBtn/BackwardsBtn";
import { commonStyles } from "../../scripts/styles";

const Layout = () => {
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <BackwardsBtn />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Slot />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default Layout;
