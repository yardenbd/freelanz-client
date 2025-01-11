import React from "react";
import {
    Image,
    Keyboard,
    Platform,
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
import { GoogleBtn } from "../../../components/GoogleBtn/GoogleBtn";
import { Link, useRouter } from "expo-router";
import { useAppDispatch } from "../../../hooks/hooks";
import { authenticateWithApple } from "../../../store/features/user/actions";

const Index = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onAppleSignIn = async (
        credential: AppleAuthentication.AppleAuthenticationCredential
    ) => {
        await dispatch(authenticateWithApple(credential));
        router.push("/auth/complete-profile");
    };

    const renderSSOLogin =
        Platform.OS === "ios" ? (
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    gap: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AppleBtn
                    overrideStyle={{ width: "45%" }}
                    onAppleSignIn={onAppleSignIn}
                />
                <GoogleBtn
                    overrideStyle={{ width: "45%" }}
                    onAppleSignIn={onAppleSignIn}
                />
            </View>
        ) : (
            <GoogleBtn onAppleSignIn={onAppleSignIn} />
        );
    return (
        <View style={[commonStyles.centerContainer]}>
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
                {renderSSOLogin}
            </View>
            <Text style={{ color: COLORS.black, marginTop: "auto" }}>
                {t("dontHaveAccount")}{" "}
                <Link
                    style={{
                        color: COLORS.blue,
                        textDecorationLine: "underline",
                    }}
                    href={"/"}
                >
                    {t("signUp")}
                </Link>
            </Text>
        </View>
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
