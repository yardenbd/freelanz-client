import React from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    Pressable,
} from "react-native";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import { COLORS } from "../../constants/Colors";
import Svg, { Path } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../../scripts/styles";
import { JobRecommendation } from "../../types/types";

type SwipeableCardProps = {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    job: JobRecommendation;
    bg: string;
    ellipseBg: string;
};

type ContextType = {
    startX: number;
};

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
    onSwipeRight,
    onSwipeLeft,
    bg,
    ellipseBg,
    job,
}) => {
    const { t } = useTranslation();
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const SCREEN_WIDTH = Dimensions.get("window").width;

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType
    >({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
        },
        onEnd: () => {
            if (translateX.value > SCREEN_WIDTH / 3) {
                translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });
                opacity.value = withTiming(0, { duration: 0 }, () => {
                    runOnJS(onSwipeRight)();
                });
            } else if (translateX.value < -SCREEN_WIDTH / 3) {
                translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
                opacity.value = withTiming(0, { duration: 0 }, () => {
                    runOnJS(onSwipeLeft)();
                });
            } else {
                translateX.value = withSpring(0);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

    const {
        jobSkills,
        userName,
        jobAddress,
        jobPayment,
        jobTitle,
        jobStrengths,
        jobDateStart,
    } = job;
    const skillsArr = jobSkills.split(",");
    const strengthsArr = jobStrengths.split(",");

    const skillAndStrengthToRender = [skillsArr[0], strengthsArr[0]].map(
        (skill) => (
            <View
                key={skill}
                style={[commonStyles.ellipse, { backgroundColor: ellipseBg }]}
            >
                <Text style={{ color: COLORS.white }}>{skill}</Text>
            </View>
        )
    );
    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={[
                    styles.card,
                    animatedStyle,
                    {
                        backgroundColor: bg,
                    },
                ]}
            >
                <View style={styles.profile}>
                    <Image
                        style={styles.img}
                        src="https://thispersondoesnotexist.com/"
                    />
                    <Text style={styles.name}>{userName}</Text>
                </View>
                <Text style={styles.jobName}>{jobTitle}</Text>
                <View style={styles.set}>{skillAndStrengthToRender}</View>
                <View style={styles.location}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <Path
                            d="M8.99991 10.0725C10.2923 10.0725 11.3399 9.0248 11.3399 7.73246C11.3399 6.44011 10.2923 5.39246 8.99991 5.39246C7.70757 5.39246 6.65991 6.44011 6.65991 7.73246C6.65991 9.0248 7.70757 10.0725 8.99991 10.0725Z"
                            stroke="white"
                            stroke-width="1.5"
                        />
                        <Path
                            d="M2.71503 6.3675C4.19253 -0.127498 13.815 -0.119998 15.285 6.375C16.1475 10.185 13.7775 13.41 11.7 15.405C10.1925 16.86 7.80753 16.86 6.29253 15.405C4.22253 13.41 1.85253 10.1775 2.71503 6.3675Z"
                            stroke="white"
                            stroke-width="1.5"
                        />
                    </Svg>
                    <Text style={{ color: COLORS.white }}>{jobAddress}</Text>
                </View>
                <View style={styles.date}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M8 2V5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M16 2V5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M3.5 9.08997H20.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M15.6947 13.7H15.7037"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M15.6947 16.7H15.7037"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M11.9955 13.7H12.0045"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M11.9955 16.7H12.0045"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M8.29431 13.7H8.30329"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M8.29431 16.7H8.30329"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </Svg>
                    <Text style={{ color: COLORS.white, fontWeight: 500 }}>
                        {jobDateStart.split("-").reverse().join("-")}
                    </Text>
                </View>

                <View style={styles.rowFill}>
                    <View style={styles.budget}>
                        <Text style={styles.budgetText}>{t("budget")}</Text>
                        <Text style={styles.budgetPrice}>{jobPayment} ILS</Text>
                    </View>
                    <Pressable style={styles.details}>
                        <Text style={{ color: bg }}>{t("details")}</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    budgetPrice: { color: COLORS.white, fontWeight: 700, fontSize: 22 },
    budgetText: {
        color: COLORS.white,
        opacity: 0.7,
        textAlign: "right",
    },
    budget: {
        gap: 10,
    },
    details: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 25,
        paddingVertical: 16,
        borderRadius: 10,
    },
    rowFill: {
        flexDirection: "row-reverse",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
    },
    date: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        alignSelf: "flex-end",
        marginTop: 38,
    },
    set: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 31,
    },

    jobName: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 700,
        textAlign: "right",
        marginTop: 21,
    },
    name: { color: COLORS.white, fontSize: 20, fontWeight: 700 },
    img: { borderRadius: "50%", width: 60, height: 60 },
    profile: {
        flexDirection: "row-reverse",
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    card: {
        borderRadius: 35,
        padding: 28,
        height: 433,
        width: "100%",
        position: "absolute",
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    location: {
        paddingHorizontal: 18,
        paddingVertical: 7,
        backgroundColor: "#6C86FF",
        borderRadius: 50,
        flexDirection: "row",
        gap: 10,
        alignSelf: "flex-end",
        marginTop: 15,
    },
});
