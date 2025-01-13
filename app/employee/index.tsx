import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwipeableCardList } from "../../components/SwipeableCardList/SwipeableCardList";
import { useEffect, useState } from "react";
import { JobRecommendation } from "../../types/types";
import { apiClient } from "../../apiClient";

export default function Index() {
    const [jobs, setJobs] = useState<JobRecommendation[]>([]);
    const getJobs = async () => {
        try {
            const response = await apiClient.get<{ jobs: JobRecommendation[] }>(
                "/job"
            );
            setJobs(response.data.jobs);
        } catch (err) {
            Alert.alert("Unable to find jobs");
        }
    };

    const onRemove = (id: number) => {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    };
    useEffect(() => {
        getJobs();
    }, []);
    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <SwipeableCardList jobs={jobs} onRemove={onRemove} />
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
