import React from "react";
import {
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { commonStyles } from "../../../scripts/styles";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../../constants/Colors";
import { PhoneSignIn } from "../../../components/PhoneSignIn/PhoneSignIn";
import { AppleBtn } from "../../../components/AppleBtn/AppleBtn";
import * as AppleAuthentication from "expo-apple-authentication";

const Index = () => {
    const { t } = useTranslation();

    const onAppleSignIn = async (
        credential: AppleAuthentication.AppleAuthenticationCredential
    ) => {};

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={[
                        commonStyles.container,
                        commonStyles.centerContainer,
                    ]}
                >
                    <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/LogoCover.png")}
                        style={styles.logo}
                    />
                    <View style={{ gap: 30, width: "100%" }}>
                        <View style={{ gap: 10, justifyContent: "center" }}>
                            <Text style={styles.header}>{t("signInText")}</Text>
                            <Text style={styles.subHeader}>
                                {t("enterPhoneNumber")}
                            </Text>
                        </View>
                        <PhoneSignIn />
                        <View style={styles.row}>
                            <View style={styles.dash}></View>
                            <Text>{t("orSignInWith")}</Text>
                            <View style={styles.dash}></View>
                        </View>
                        <AppleBtn onAppleSignIn={onAppleSignIn} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: { marginTop: 20, marginBottom: 45 },
    row: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        width: "100%",
    },
    dash: { height: 1, width: "29.5%", backgroundColor: "#CACED1" },
    subHeader: { color: COLORS.grey, fontSize: 16, textAlign: "center" },
    header: {
        color: COLORS.black,
        fontSize: 30,
        fontWeight: 600,
        textAlign: "center",
    },
});
export default Index;
