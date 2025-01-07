import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../../scripts/styles";
import { COLORS } from "../../constants/Colors";

export const PhoneSignIn = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <InputWithLabel
                keyboardType="decimal-pad"
                label={t("phone")}
                onChangeText={() => {}}
                placeholder={t("phonePlaceholder")}
                secureTextEntry={false}
                value=""
            ></InputWithLabel>
            <Pressable style={commonStyles.largeBtn}>
                <Text style={{ color: COLORS.white, textAlign: "center" }}>
                    {t("sendOtp")}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        gap: 30,
    },
});
