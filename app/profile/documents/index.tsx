import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../../scripts/styles";
import { useTranslation } from "react-i18next";
import { FileUploader } from "../../../components/FileUploader/FileUploader";
import { PrimaryButton } from "../../../components/PrimaryButton/PrimaryButton";
import { useSteps } from "../../../context/StepsContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Index = () => {
    const { t } = useTranslation();
    const { nextStep } = useSteps();
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) return null;
    const renderCvUpload = user.type === "Employee" && (
        <FileUploader
            label={t("uploadCv")}
            subLabel={t("chooseFileOrImage")}
            onUpload={async (asset) => {}}
            acceptedTypes={["application/pdf"]}
        />
    );
    return (
        <View style={{ flex: 1 }}>
            <Text style={commonStyles.mediumBlackText}>{t("uploadDocs")}</Text>
            <Text style={[commonStyles.greySubLabel, { textAlign: "center" }]}>
                {t("uploadDocs")}
            </Text>
            <View style={styles.fileUploaders}>
                {renderCvUpload}
                <FileUploader
                    label={t("uploadId")}
                    subLabel={t("chooseImage")}
                    onUpload={async (asset) => {}}
                    acceptedTypes={[
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                        "image/webp",
                    ]}
                />
            </View>
            <PrimaryButton
                label={t("continue")}
                onPress={() => {
                    nextStep();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fileUploaders: {
        gap: 18,
        marginTop: 25,
    },
});

export default Index;
