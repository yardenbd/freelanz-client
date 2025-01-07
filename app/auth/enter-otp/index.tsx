import React from "react";
import { SafeAreaView, View } from "react-native";
import { BackwardsBtn } from "../../../components/BackwardsBtn/BackwardsBtn";
import { commonStyles } from "../../../scripts/styles";

const Index = () => {
    return (
        <SafeAreaView>
            <View style={commonStyles.container}>
                <BackwardsBtn />
            </View>
        </SafeAreaView>
    );
};

export default Index;
