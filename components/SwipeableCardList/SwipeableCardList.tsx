import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SwipeableCard } from "../SwipeableCard/SwipeableCard";
import { COLORS } from "../../constants/Colors";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { JobRecommendation } from "../../types/types";

const SCREEN_WIDTH = Dimensions.get("window").width;

const initialCards = [
    {
        id: "1",
        name: "Angela Doe",
        title: "AC Regular Service",
        location: "New York",
        date: "January 5, 2024",
        budget: "$60.00 - $90.00",
        image: "https://via.placeholder.com/40",
        bg: COLORS.blue,
        ellipseBg: "#6C86FF",
    },
    {
        id: "2",
        name: "John Smith",
        title: "Car Repair",
        location: "Los Angeles",
        date: "January 10, 2024",
        budget: "$100.00 - $150.00",
        image: "https://via.placeholder.com/40",
        bg: COLORS.black,
        ellipseBg: "#6C86FF",
    },
    {
        id: "3",
        name: "Jane Doe",
        title: "Home Cleaning",
        location: "San Francisco",
        date: "January 12, 2024",
        budget: "$50.00 - $75.00",
        image: "https://via.placeholder.com/40",
        bg: "#474747",
        ellipseBg: "#6C86FF",
    },
    {
        id: "4",
        name: "Emily Clark",
        title: "Plumbing",
        location: "Chicago",
        date: "January 15, 2024",
        budget: "$80.00 - $120.00",
        image: "https://via.placeholder.com/40",
        bg: "#787979",
        ellipseBg: "#6C86FF",
    },
];

interface ISwipeableCardListProps {
    jobs: JobRecommendation[];
    onRemove: (id: number) => void;
}

export const SwipeableCardList: React.FC<ISwipeableCardListProps> = ({
    jobs,
    onRemove,
}) => {
    const handleSwipeRight = (id: number) => {
        console.log(`Swiped Right: ${id}`);
        removeCard(id);
    };

    const handleSwipeLeft = (id: number) => {
        console.log(`Swiped Left: ${id}`);
        removeCard(id);
    };

    const removeCard = (id: number) => {
        onRemove(id);
    };
    const jobsToRender = jobs.map((job, index) => {
        const decreasingIndex = jobs.length - 1 - index;
        const cardWidth = SCREEN_WIDTH - index * 20; // Width is fixed, not animated
        const cardPosition = decreasingIndex * 20; // Controls vertical stacking

        return (
            <Animated.View
                key={job.id}
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout.springify(300)}
                style={[
                    styles.cardWrapper,
                    {
                        width: cardWidth - 50, // Static width
                        top: cardPosition, // Stacks cards dynamically
                        zIndex: jobs.length - index, // Maintain proper stacking order
                    },
                ]}
            >
                <SwipeableCard
                    onSwipeRight={() => handleSwipeRight(job.id)}
                    onSwipeLeft={() => handleSwipeLeft(job.id)}
                    bg={COLORS.blue}
                    ellipseBg="#6C86FF"
                    job={job}
                />
            </Animated.View>
        );
    });
    return <View style={styles.container}>{jobsToRender}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardWrapper: {
        position: "absolute", // Ensures cards are stacked
    },
});
