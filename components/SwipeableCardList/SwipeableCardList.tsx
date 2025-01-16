import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SwipeableCard } from "../SwipeableCard/SwipeableCard";
import { COLORS } from "../../constants/Colors";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { JobRecommendation } from "../../types/types";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface ISwipeableCardListProps {
    jobs: JobRecommendation[];
    onRemove: (id: number) => void;
}

export const SwipeableCardList: React.FC<ISwipeableCardListProps> = ({
    jobs,
    onRemove,
}) => {
    const handleSwipeRight = (id: number) => {
        removeCard(id);
    };

    const handleSwipeLeft = (id: number) => {
        removeCard(id);
    };

    const removeCard = (id: number) => {
        onRemove(id);
    };
    const jobsToRender = jobs
        .filter((job, index) => {
            if (index < 4) return job;
        })
        .map((job, index) => {
            const decreasingIndex = 3 - index;
            const cardWidth = SCREEN_WIDTH - index * 20;
            const cardPosition = decreasingIndex * 20;
            return (
                <Animated.View
                    key={job.id}
                    entering={FadeIn}
                    exiting={FadeOut}
                    layout={Layout.springify(300)}
                    style={[
                        styles.cardWrapper,
                        {
                            width: cardWidth - 50,
                            top: cardPosition,
                            zIndex: jobs.length - index,
                        },
                    ]}
                >
                    <SwipeableCard
                        onSwipeRight={() => handleSwipeRight(job.id)}
                        onSwipeLeft={() => handleSwipeLeft(job.id)}
                        bg={job.bg}
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
        justifyContent: "center",
        alignItems: "center",
    },
    cardWrapper: {},
});
