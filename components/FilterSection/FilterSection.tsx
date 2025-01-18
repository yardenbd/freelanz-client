import React, { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Button,
} from "react-native";
import {
    GestureHandlerRootView,
    Pressable,
} from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../constants/Colors";
import { DatePicker } from "../DatePicker/DatePicker";
import { DualRangeSlider } from "../DualRangeSlider/DualRangeSlider";
import { Silder } from "../Slider/Slider";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { FilterState } from "../../types/types";

interface FilterSectionProps {
    onClose: () => void;
    filters: FilterState;
    setFilters: Dispatch<SetStateAction<FilterState>>;
}

const { height } = Dimensions.get("window");

export const FilterSection: React.FC<FilterSectionProps> = ({
    onClose,
    setFilters,
    filters,
}) => {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const { t } = useTranslation();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        return () => {};
    }, [slideAnim]);

    const closeFilter = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => onClose()); // Call the onClose prop after animation
    };

    return (
        <GestureHandlerRootView>
            <Animated.View
                style={[
                    styles.filterContainer,
                    { transform: [{ translateY: slideAnim }] },
                ]}
            >
                <View style={styles.row}>
                    <Pressable onPress={closeFilter}>
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M5.00098 5L19 18.9991"
                                stroke="#262626"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M4.99996 18.9991L18.999 5"
                                stroke="#262626"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </Svg>
                    </Pressable>
                    <Text style={styles.text}>{t("allFilters")}</Text>
                    <Pressable>
                        <Text style={styles.clearBtn}>
                            {t("clearAllFilters")}
                        </Text>
                    </Pressable>
                </View>
                <DatePicker
                    date={filters.date}
                    onSelect={(value) => {
                        setFilters((prev) => {
                            return { ...prev, date: value };
                        });
                    }}
                    label={t("date")}
                />
                <DualRangeSlider
                    value={filters.budget}
                    setValue={(value) =>
                        setFilters((prev) => {
                            return { ...prev, budget: value };
                        })
                    }
                />
                <Silder
                    value={filters.range}
                    setValue={(value) =>
                        setFilters((prev) => {
                            return { ...prev, range: value };
                        })
                    }
                />
                <PrimaryButton onPress={() => {}} label={t("showResults")} />
            </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    clearBtn: {
        color: COLORS.blue,
        fontSize: 22,
        fontWeight: 400,
    },
    row: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
    },
    text: {
        color: COLORS.black, // Replace with your theme variable if applicable
        fontSize: 22,
        fontWeight: 700,
        lineHeight: 30,
        textAlign: "right",
        marginLeft: "auto",
    },
    filterContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.9,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        gap: 15,
    },
});
