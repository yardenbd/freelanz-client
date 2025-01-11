import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

interface SwipeableCardProps {
    item: string;
    onSwipe: (direction: boolean) => void;
}

export const SwipeableCard: FC<SwipeableCardProps> = ({ item, onSwipe }) => {
    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);

    // Gesture event handler
    const gestureHandler = (event: any) => {
        translateX.value = event.translationX;
        console.log("translateX", translateX);
        rotate.value = (event.translationX / width) * 30; // Rotation effect
    };

    // Gesture end handler
    const gestureHandlerEnd = (event: any) => {
        if (event.translationX > 100) {
            translateX.value = withSpring(width); // Swipe Right
            onSwipe(true);
        } else if (event.translationX < -100) {
            translateX.value = withSpring(-width); // Swipe Left
            onSwipe(false);
        } else {
            translateX.value = withSpring(0); // Reset position
            rotate.value = withSpring(0); // Reset rotation
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value) }, // Apply X translation
            { rotate: `${rotate.value}deg` }, // Apply rotation
        ],
    }));

    return (
        <PanGestureHandler
            onGestureEvent={gestureHandler}
            onHandlerStateChange={gestureHandlerEnd}
        >
            <Animated.View style={[styles.card, animatedStyle]}>
                <Text style={styles.cardText}>{item}</Text>
            </Animated.View>
        </PanGestureHandler>
    );
};
const styles = StyleSheet.create({
    card: {
        position: "absolute",
        width: "40%",
        height: 200,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    cardText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
