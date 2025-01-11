import { SafeAreaView, StyleSheet } from "react-native";
import {
    Gesture,
    GestureDetector,
    Directions,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

export default function Index() {
    const position = useSharedValue(0);
    const flingGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart((e) => {
            position.value = withTiming(position.value + 100, {
                duration: 100,
            });
        })
        .direction(Directions.LEFT)
        .onStart((e) => {
            position.value = withTiming(position.value - 100, {
                duration: 100,
            });
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <GestureDetector gesture={flingGesture}>
                    <Animated.View style={[styles.box, animatedStyle]} />
                </GestureDetector>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    box: {
        height: 120,
        width: 120,
        backgroundColor: "#b58df1",
        borderRadius: 20,
        marginBottom: 30,
    },
});
