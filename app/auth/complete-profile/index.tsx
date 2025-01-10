import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../../scripts/styles";
import { useTranslation } from "react-i18next";
import { EmptyProfileImage } from "../../../components/EmptyProfileImage/EmptyProfileImage";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors";
import { InputWithLabel } from "../../../components/InputWithLabel/InputWithLabel";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import { Dropdown } from "../../../components/Dropdown/Dropdown";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { PrimaryButton } from "../../../components/PrimaryButton/PrimaryButton";
import { useAppDispatch } from "../../../hooks/hooks";
import { updateUser } from "../../../store/features/auth/actions";

interface IFormDataState {
    profileImg: null | Partial<ImagePicker.ImagePickerAsset>;
    name: string;
    email: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
}

const Index = () => {
    const [formData, setFormData] = useState<IFormDataState>({
        email: "",
        name: "",
        profileImg: null,
        dateOfBirth: "",
        gender: "Male",
    });

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permission Required",
                "Permission to access the media library is required."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setFormData((prev) => {
                return {
                    ...prev,
                    profileImg: {
                        uri: asset.uri,
                        name: asset.uri.split("/").pop(),
                        type: asset.type,
                    },
                };
            });
        }
    };

    const handleChange = (value: string, propName: keyof IFormDataState) => {
        console.log(propName, value);
        setFormData((prev) => {
            return { ...prev, [propName]: value };
        });
    };
    const renderProfileImgOrAvatar = formData.profileImg ? (
        <Image style={styles.img} src={formData.profileImg.uri} />
    ) : (
        <EmptyProfileImage />
    );

    const onPress = async () => {
        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === "profileImg") {
                data.append("file", value);
            } else data.append(key, value);
        }
        await dispatch(updateUser(data));
    };
    return (
        <View style={[commonStyles.container, { height: "100%" }]}>
            <Text style={commonStyles.authLabel}>{t("completeProfile")}</Text>
            <Pressable style={styles.profileImage} onPress={pickImage}>
                {renderProfileImgOrAvatar}
                <View style={styles.pencil}>
                    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <Path
                            d="M12.1233 4.32344L9.67876 1.87891C9.5979 1.79723 9.50166 1.73238 9.39559 1.68813C9.28952 1.64388 9.17572 1.62109 9.06079 1.62109C8.94586 1.62109 8.83207 1.64388 8.726 1.68813C8.61992 1.73238 8.52368 1.79723 8.44282 1.87891L1.88032 8.44141C1.79878 8.52233 1.73409 8.6186 1.68997 8.72467C1.64585 8.83074 1.62319 8.9445 1.62329 9.05938V11.5039C1.62329 11.736 1.71548 11.9585 1.87957 12.1226C2.04367 12.2867 2.26623 12.3789 2.49829 12.3789H4.94282C5.0577 12.379 5.17146 12.3563 5.27753 12.3122C5.3836 12.2681 5.47987 12.2034 5.56079 12.1219L12.1233 5.55938C12.2856 5.39465 12.3766 5.17267 12.3766 4.94141C12.3766 4.71014 12.2856 4.48817 12.1233 4.32344ZM4.94282 11.5039H2.49829V9.05938L7.31079 4.24688L9.75532 6.69141L4.94282 11.5039ZM10.3733 6.07344L7.92876 3.62891L9.06079 2.49688L11.5053 4.94141L10.3733 6.07344Z"
                            fill="white"
                        />
                    </Svg>
                </View>
            </Pressable>
            <View style={styles.form}>
                <InputWithLabel
                    keyboardType="default"
                    onChangeText={(value) => handleChange(value, "name")}
                    placeholder={t("name")}
                    value={formData.name}
                    errorMessage=""
                    secureTextEntry={false}
                    label={t("name")}
                />
                <InputWithLabel
                    keyboardType="default"
                    onChangeText={(value) => handleChange(value, "email")}
                    placeholder={t("email")}
                    label={t("email")}
                    value={formData.email}
                    errorMessage=""
                    secureTextEntry={false}
                />
                <DatePicker
                    date={formData.dateOfBirth}
                    onSelect={(value) => {
                        handleChange(value, "dateOfBirth");
                    }}
                />
                <Dropdown
                    selected={formData.gender}
                    onSelect={(value) => handleChange(value, "gender")}
                />
                <View style={styles.row}>
                    <Checkbox />
                    <Text>
                        {t("iUnderstand")}
                        <Link style={commonStyles.underscoreLink} href={"/"}>
                            {t("userAgreement") + " "}
                        </Link>
                        {t("and")}
                        <Link style={commonStyles.underscoreLink} href={"/"}>
                            {t("privacyPolicy")}
                        </Link>
                    </Text>
                </View>
            </View>
            <PrimaryButton label={t("continue")} onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: "row-reverse", gap: 10 },
    form: { gap: 16 },
    profileImage: {
        position: "relative",
        width: 112,
        height: 112,
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 45,
        marginBottom: 25,
    },
    img: { width: 112, height: 112, borderRadius: "50%" },
    pencil: {
        backgroundColor: COLORS.blue,
        borderRadius: "50%",
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: COLORS.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 0,
        bottom: 3,
    },
});

export default Index;
