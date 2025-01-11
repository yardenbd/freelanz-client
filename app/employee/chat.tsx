import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { commonStyles } from "../../scripts/styles";

const Chat = () => {
    return (
        <SafeAreaView style={commonStyles.safeAreaDashboard}>
            <View style={commonStyles.dashboardContainer}>
                <Text>Chat</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Chat;
