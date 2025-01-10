import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import "../../i18n"; // Import your i18n configuration
import { COLORS } from "../../constants/Colors";
import { Link } from "expo-router";
import { commonStyles } from "../../scripts/styles";
const Index = () => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={commonStyles.safeArea}>
            <View style={[commonStyles.container, styles.container]}>
                <Text style={styles.welcomeText}>{t("welcomeText")}</Text>
                <Text style={styles.subText}>{t("welcomeText")}</Text>
                <Link style={commonStyles.largeBtn} href={"/auth/sign-in"}>
                    <Text style={{ color: COLORS.white }}>
                        {t("getStartedText")}
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        gap: 25,
        justifyContent: "center",
    },
    subText: {
        color: COLORS.grey,
        fontSize: 18,
        fontWeight: 400,
        textAlign: "center",
    },
    welcomeText: {
        color: COLORS.black,
        fontSize: 24,
        fontWeight: 600,
        textAlign: "center",
    },
});

export default Index;
