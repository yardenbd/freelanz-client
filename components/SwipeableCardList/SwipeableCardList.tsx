import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    withSpring,
    withTiming,
    useSharedValue,
} from "react-native-reanimated";
import {
    GestureHandlerRootView,
    PanGestureHandler,
    GestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { SwipeableCard } from "../SwipeableCard/SwipeableCard";

const { width } = Dimensions.get("window");

// Type for the props of the swipeable card list
interface SwipeableCardListProps {}

// Main Swipeable Card List Component
export const SwipeableCardList: FC<SwipeableCardListProps> = () => {
    const [items, setItems] = React.useState<string[]>([
        "Card 1",
        "Card 2",
        "Card 3",
        "Card 4",
        "Card 5",
    ]);

    // Handle card swipe
    const handleSwipe = (direction: boolean) => {
        console.log(direction ? "Swiped Right" : "Swiped Left");
        // Remove the card from the stack
        setItems((prevItems) => prevItems.slice(1));
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.list}>
                {items.map((item, index) => (
                    <SwipeableCard
                        key={index}
                        item={item}
                        onSwipe={handleSwipe}
                    />
                ))}
            </View>
        </GestureHandlerRootView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        position: "relative",
        width: width - 40, // Adjust width as needed
        height: "80%",
    },
});
