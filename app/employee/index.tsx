import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwipeableCardList } from "../../components/SwipeableCardList/SwipeableCardList";
import { useEffect, useState } from "react";
import { JobRecommendation } from "../../types/types";
import { apiClient } from "../../apiClient";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

const bgIndexHash = {
    "0": COLORS.blue,
    "1": COLORS.black,
    "2": "#474747",
    "3": "#787979",
};

export default function Index() {
    const [jobs, setJobs] = useState<JobRecommendation[]>([]);
    const { t } = useTranslation();
    const { user } = useAppSelector((state: RootState) => state.user);
    const getJobs = async () => {
        try {
            const response = await apiClient.get<{ jobs: JobRecommendation[] }>(
                "/job"
            );
            const mapped = response.data.jobs.map((job, index) => {
                const bg = bgIndexHash[index % 4];
                return { ...job, bg };
            });

            setJobs(mapped);
        } catch (err) {
            Alert.alert(JSON.stringify(err));
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
            <View>
                <View style={styles.row}>
                    <View style={styles.profileImgBorder}>
                        <Image
                            style={styles.img}
                            src="https://thispersondoesnotexist.com/"
                        />
                    </View>
                    <View style={styles.col}>
                        <Text>{t("welcomeBack")}</Text>
                        <Text style={styles.userName}>{user?.name}</Text>
                    </View>
                </View>
                <View style={styles.header}>
                    <Text style={styles.dreamJobText}>
                        {t("letsFindYourDreamJob")}
                    </Text>
                </View>
            </View>
            <GestureHandlerRootView>
                <SwipeableCardList jobs={jobs} onRemove={onRemove} />
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dreamJobText: {
        color: COLORS.black,
        fontSize: 30,
        fontWeight: 700,
        textAlign: "right",
    },
    header: {
        flexDirection: "row-reverse",
        gap: 18,
    },
    userName: {
        color: COLORS.black,
        fontWeight: 700,
    },
    col: {
        flexDirection: "column",
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: "50%",
    },
    profileImgBorder: {
        borderRadius: "50%",
        borderWidth: 1,
        borderColor: COLORS.blue,
        padding: 3,
    },
    row: {
        flexDirection: "row-reverse",
        gap: 8,
        alignItems: "center",
    },
    box: {
        height: 120,
        width: 120,
        backgroundColor: "#b58df1",
        borderRadius: 20,
        marginBottom: 30,
    },
});
