import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwipeableCardList } from "../../components/SwipeableCardList/SwipeableCardList";
import { useEffect, useState } from "react";
import { FilterState, JobRecommendation } from "../../types/types";
import { apiClient } from "../../apiClient";
import { COLORS } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import ShadowButton from "../../components/ShadowButton/ShadowButton";
import Svg, { Path } from "react-native-svg";
import { FilterSection } from "../../components/FilterSection/FilterSection";

const bgIndexHash = {
    "0": COLORS.blue,
    "1": COLORS.black,
    "2": "#474747",
    "3": "#787979",
};

export default function Index() {
    const [jobs, setJobs] = useState<JobRecommendation[]>([]);
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterState>({
        date: "",
        budget: [200, 500],
        range: 50,
    });

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

    const openFilter = () => setIsFilterVisible(true);
    const closeFilter = () => setIsFilterVisible(false);

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
                    <ShadowButton onPress={openFilter}>
                        <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <Path
                                d="M18.3333 5.41669H13.3333"
                                stroke={COLORS.black}
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M5.00008 5.41669H1.66675"
                                stroke={COLORS.black}
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M8.33341 8.33333C9.94425 8.33333 11.2501 7.0275 11.2501 5.41667C11.2501 3.80584 9.94425 2.5 8.33341 2.5C6.72258 2.5 5.41675 3.80584 5.41675 5.41667C5.41675 7.0275 6.72258 8.33333 8.33341 8.33333Z"
                                stroke={COLORS.black}
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M18.3333 14.5833H15"
                                stroke={COLORS.black}
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M6.66675 14.5833H1.66675"
                                stroke={COLORS.black}
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M11.6667 17.5C13.2775 17.5 14.5833 16.1942 14.5833 14.5834C14.5833 12.9725 13.2775 11.6667 11.6667 11.6667C10.0558 11.6667 8.75 12.9725 8.75 14.5834C8.75 16.1942 10.0558 17.5 11.6667 17.5Z"
                                stroke={COLORS.black}
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </Svg>
                        <Text>{t("filters")}</Text>
                    </ShadowButton>
                </View>
            </View>
            <GestureHandlerRootView>
                <SwipeableCardList jobs={jobs} onRemove={onRemove} />
            </GestureHandlerRootView>
            <Modal visible={isFilterVisible} transparent animationType="none">
                <FilterSection
                    filters={filters}
                    setFilters={setFilters}
                    onClose={closeFilter}
                />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dreamJobText: {
        color: COLORS.black,
        fontSize: 28,
        fontWeight: 700,
        textAlign: "right",
    },
    header: {
        flexDirection: "row-reverse",
        width: "100%",
        justifyContent: "space-between",
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
