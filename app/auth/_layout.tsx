import { Slot } from "expo-router";
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
    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <BackwardsBtn />
                    <Slot />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default Layout;
