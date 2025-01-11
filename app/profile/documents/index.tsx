import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../../scripts/styles";
import { useTranslation } from "react-i18next";
import { FileUploader } from "../../../components/FileUploader/FileUploader";
import { PrimaryButton } from "../../../components/PrimaryButton/PrimaryButton";
import { useSteps } from "../../../context/StepsContext";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { DocumentPickerAsset } from "expo-document-picker";
import { uploadDocuments } from "../../../store/features/user/actions";

interface FilesState {
    cvFile: null | DocumentPickerAsset;
    idFile: null | DocumentPickerAsset;
}

const Index = () => {
    const [files, setFiles] = useState<FilesState>({
        cvFile: null,
        idFile: null,
    });
    const { t } = useTranslation();
    const { nextStep } = useSteps();
    const user = useAppSelector((state: RootState) => state.user.user);
    if (!user) return null;
    const dispatch = useAppDispatch();

    const handleUpload = (
        asset: DocumentPickerAsset,
        propName: keyof FilesState
    ) => {
        setFiles((prev) => {
            return { ...prev, [propName]: asset };
        });
    };
    const onPress = async () => {
        const formData = new FormData();

        if (files.cvFile) {
            formData.append("files", files.cvFile);
        }
        if (files.idFile) {
            formData.append("files", files.idFile);
        }
        await dispatch(uploadDocuments(formData));
        // nextStep();
    };
    const renderCvUpload = user.type === "Employee" && (
        <FileUploader
            label={t("uploadCv")}
            subLabel={files.cvFile?.name || t("chooseFileOrImage")}
            onUpload={(asset) => handleUpload(asset, "cvFile")}
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
                    subLabel={files.idFile?.name || t("chooseImage")}
                    onUpload={(asset) => handleUpload(asset, "idFile")}
                    acceptedTypes={[
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                        "image/webp",
                    ]}
                />
            </View>
            <PrimaryButton label={t("continue")} onPress={onPress} />
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
