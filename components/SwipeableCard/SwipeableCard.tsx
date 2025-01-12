import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
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

type SwipeableCardProps = {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    name: string;
    title: string;
    location: string;
    date: string;
    budget: string;
    image: string;
    bg: string;
};

type ContextType = {
    startX: number;
};

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
    onSwipeRight,
    onSwipeLeft,
    bg,
}) => {
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1); // For smooth fading out
    const SCREEN_WIDTH = Dimensions.get("window").width;

    // Gesture Handler Logic
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
                // Swiped Right
                translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });
                opacity.value = withTiming(0, { duration: 0 }, () => {
                    runOnJS(onSwipeRight)();
                });
            } else if (translateX.value < -SCREEN_WIDTH / 3) {
                // Swiped Left
                translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
                opacity.value = withTiming(0, { duration: 0 }, () => {
                    runOnJS(onSwipeLeft)();
                });
            } else {
                // Reset position
                translateX.value = withSpring(0);
            }
        },
    });

    // Animated Styles for Movement and Opacity
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

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
                <Text style={styles.text}>Swipe Me!</Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 35,
        padding: 15,
        height: 200,
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
