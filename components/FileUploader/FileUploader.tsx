import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { commonStyles } from "../../scripts/styles";
import { COLORS } from "../../constants/Colors";

interface IFileUploaderProps {
    label: string;
    subLabel: string;
    acceptedTypes: string[];
    onUpload: (file: DocumentPicker.DocumentPickerAsset) => Promise<void>;
}

export const FileUploader: React.FC<IFileUploaderProps> = ({
    label,
    onUpload,
    subLabel,
    acceptedTypes,
}) => {
    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: acceptedTypes,
            });

            if (result.assets) {
                console.log(result.assets[0].mimeType);
            }
        } catch (error) {
            Alert.alert("Error", "File selection failed.");
            console.error("Error selecting file:", error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Pressable onPress={pickFile} style={styles.dashed}>
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <Path
                        d="M12 13.3333C13.4728 13.3333 14.6667 12.1394 14.6667 10.6667C14.6667 9.19391 13.4728 8 12 8C10.5272 8 9.33333 9.19391 9.33333 10.6667C9.33333 12.1394 10.5272 13.3333 12 13.3333Z"
                        stroke="#262626"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        d="M17.3333 2.66669H12C5.33333 2.66669 2.66667 5.33335 2.66667 12V20C2.66667 26.6667 5.33333 29.3334 12 29.3334H20C26.6667 29.3334 29.3333 26.6667 29.3333 20V13.3334"
                        stroke="#262626"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <Path
                        d="M21 6.66669H28.3333"
                        stroke="#262626"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <Path
                        d="M24.6667 10.3333V3"
                        stroke="#262626"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <Path
                        d="M3.56 25.2666L10.1333 20.8533C11.1867 20.1466 12.7067 20.2266 13.6533 21.04L14.0933 21.4266C15.1333 22.32 16.8133 22.32 17.8533 21.4266L23.4 16.6666C24.44 15.7733 26.12 15.7733 27.16 16.6666L29.3333 18.5333"
                        stroke="#262626"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </Svg>
                <Text>{subLabel}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    label: { fontWeight: 700, color: COLORS.black },
    dashed: {
        width: "100%",
        borderStyle: "dashed",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 30,
        alignItems: "center",
        gap: 16,
    },
    container: {
        gap: 8,
        width: "100%",
        alignItems: "flex-end",
    },
});
