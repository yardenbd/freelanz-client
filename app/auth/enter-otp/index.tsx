import React from "react";
import {
    Button,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BackwardsBtn } from "../../../components/BackwardsBtn/BackwardsBtn";
import { commonStyles } from "../../../scripts/styles";
import { useTranslation } from "react-i18next";
import OTPInput from "../../../components/OtpInput/OtpInput";
import { COLORS } from "../../../constants/Colors";
import { PrimaryButton } from "../../../components/PrimaryButton/PrimaryButton";

const Index = () => {
    const { t } = useTranslation();
    return (
        <View style={commonStyles.container}>
            {/* <BackwardsBtn /> */}
            <View style={{ gap: 10, marginTop: 20 }}>
                <Text style={commonStyles.authLabel}>{t("enterOtp")}</Text>
                <Text style={commonStyles.greySubLabel}>
                    {t("otpDescription")}
                </Text>
            </View>
            <View style={{ gap: 18, marginTop: 20 }}>
                <OTPInput />
                <Text style={styles.resendCode}>{t("resendCode")} 00:25</Text>
                <Pressable>
                    <Text style={styles.resendCodeBtn}>{t("resendOtp")}</Text>
                </Pressable>
            </View>
            <PrimaryButton label={t("verify")} onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    resendCodeBtn: {
        textDecorationLine: "underline",
        textAlign: "center",
        color: COLORS.black,
    },
    resendCode: {
        color: COLORS.grey,
        textAlign: "center",
    },
});

export default Index;
