import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    FlatList,
    ScrollView,
} from "react-native";
import { apiClient } from "../../../apiClient";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { ISkillOrStrength } from "../../../types/types";
import { commonStyles } from "../../../scripts/styles";
import { COLORS } from "../../../constants/Colors";

const Index = () => {
    const [skills, setSkills] = useState<ISkillOrStrength[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const { t } = useTranslation();
    const currentLang = i18n.language;

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const response = await apiClient.get<ISkillOrStrength[]>(
                    `/user/skills?lang=${currentLang}`
                );
                setSkills(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getSkillsList();
    }, []);

    const handlePress = (id: number) => {
        setSelected((prev) => {
            if (prev.includes(id)) {
                return prev.filter((s) => s !== id);
            } else return [...prev, id];
        });
    };

    const renderSkills = skills.map((skill) => (
        <Pressable
            style={() => [
                styles.item,
                selected.includes(skill.id) && styles.selected,
            ]}
            onPress={() => handlePress(skill.id)}
        >
            <Text
                style={[
                    styles.title,
                    selected.includes(skill.id) && styles.selectedText,
                ]}
            >
                {skill[currentLang as keyof ISkillOrStrength]}
            </Text>
        </Pressable>
    ));
    return (
        <View style={{ flex: 1 }}>
            <Text style={commonStyles.mediumBlackText}>
                {t("skillsDescription")}
            </Text>
            <ScrollView horizontal={false} contentContainerStyle={styles.list}>
                {renderSkills}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    selectedText: { color: COLORS.white },
    selected: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
    list: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 30,
    },
    item: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "auto",
        maxWidth: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",

        color: COLORS.black,
    },
});

export default Index;
