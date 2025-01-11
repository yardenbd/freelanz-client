import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { commonStyles } from "../../../scripts/styles";
import { useTranslation } from "react-i18next";
import { InputWithLabel } from "../../../components/InputWithLabel/InputWithLabel";
import { PrimaryButton } from "../../../components/PrimaryButton/PrimaryButton";

const Index = () => {
    const [phoneNum, setPhoneNum] = useState<string>("");
    const { t } = useTranslation();
    return (
        <View style={{ gap: 20, flex: 1 }}>
            <Text style={commonStyles.authLabel}>{t("phoneVerification")}</Text>
            <InputWithLabel
                keyboardType="decimal-pad"
                onChangeText={(value) => setPhoneNum(value)}
                placeholder={t("phone")}
                label={t("phone")}
                secureTextEntry={false}
                value={phoneNum}
            />
            <PrimaryButton label={t("continue")} onPress={() => {}} />
        </View>
    );
};

export default Index;
