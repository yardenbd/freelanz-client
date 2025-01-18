import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Slider from "@react-native-community/slider";
import { RangeSlider, Slider } from "@react-native-assets/slider";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
// Type for the CustomThumb component props
interface CustomThumbProps {
    value: number;
}

// Custom Thumb Component
const CustomThumb: React.FC<CustomThumbProps> = ({ value }) => {
    return (
        <View style={styles.customThumb}>
            <View style={styles.thumbValue}>
                <Text style={{ color: COLORS.white }}>ק״מ {value}</Text>
            </View>
        </View>
    );
};

interface SliderProps {
    setValue: (value: number) => void;
    value: number;
}

export const Silder: React.FC<SliderProps> = ({ setValue, value }) => {
    const { t } = useTranslation();

    const handleSliderChange = (newRange: number) => {
        setValue(newRange);
    };
    const min = 10;
    const max = 300;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("kmAway")}</Text>
            <View style={styles.sliderContainer}>
                <Slider
                    onValueChange={handleSliderChange}
                    style={styles.slider}
                    slideOnTap={true}
                    minimumValue={min}
                    maximumValue={max}
                    step={10}
                    inverted
                    CustomThumb={CustomThumb}
                    minTrackStyle={[
                        styles.track,
                        { backgroundColor: COLORS.blue },
                    ]}
                    value={value}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    customThumb: {
        backgroundColor: COLORS.white,
        borderWidth: 5,
        borderColor: COLORS.blue,
        width: 20,
        height: 20,
        borderRadius: "50%",
        position: "relative",
    },
    thumbValue: {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        borderRadius: 20,
        backgroundColor: COLORS.blue,
        paddingHorizontal: 5,
        paddingVertical: 10,
        maxHeight: 40,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
        bottom: 24,
        right: -35,
    },
    track: { height: 10, borderRadius: 12 },

    container: {
        alignItems: "flex-end",
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 500,
        color: COLORS.black,
    },
    values: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: SLIDER_WIDTH,
        marginBottom: 20,
    },

    rangeHighlight: {
        position: "absolute",
        height: 8,
        backgroundColor: "#8A2BE2",
        borderRadius: 4,
        top: 16,
    },

    text: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "right",
    },
    sliderContainer: {
        marginTop: 20,
        width: "100%",
        justifyContent: "space-between",
    },
    slider: {
        width: "100%",
        marginVertical: 10,
    },
});
