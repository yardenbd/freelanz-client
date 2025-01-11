import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    Alert,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { commonStyles } from "../../../scripts/styles";
import * as Location from "expo-location";
import axios from "axios";
import { COLORS } from "../../../constants/Colors";
import Svg, { Path } from "react-native-svg";
import { useAppDispatch } from "../../../hooks/hooks";
import { updateUser } from "../../../store/features/user/actions";
import { PrimaryButton } from "../../../components/PrimaryButton/PrimaryButton";

interface LocationPrediction {
    place_id: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
}
interface Coordinates {
    latitude: number | null;
    longitude: number | null;
}

const Index = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [coordinates, setCoordinates] = useState<Coordinates>({
        latitude: null,
        longitude: null,
    });
    const [locationResults, setLocationResults] = useState<
        LocationPrediction[]
    >([]);
    const [currentLocation, setCurrentLocation] = useState<string>("");

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleUseCurrentLocation = async (): Promise<void> => {
        setSearchQuery("");
        setLocationResults([]);
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission Denied",
                    "Location permissions are required to use this feature."
                );
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;
            setCoordinates({ latitude, longitude });
        } catch (error) {
            console.error("Error fetching current location:", error);
            Alert.alert(
                "Error",
                "Could not fetch your current location. Please try again."
            );
        }
    };

    const handleSearch = async (query: string): Promise<void> => {
        setSearchQuery(query);
        setCurrentLocation("");

        if (query.length > 2) {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
                    {
                        params: {
                            input: query,
                            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                            types: "address",
                            language: "he",
                        },
                    }
                );
                setLocationResults(response.data.predictions);
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            }
        } else {
            setLocationResults([]);
        }
    };
    const handleSelectLocation = async (placeId: string) => {
        setLocationResults([]);
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json`,
                {
                    params: {
                        place_id: placeId,
                        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                    },
                }
            );
            const { lat, lng } = response.data.result.geometry.location;
            setCoordinates({ latitude: lat, longitude: lng });
        } catch (error) {
            console.error("Error fetching location details:", error);
        }
    };
    const onPress = async () => {
        if (!coordinates.latitude || !coordinates.longitude) return;
        await dispatch(
            updateUser({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            })
        );
    };

    const renderCurrentLocation = currentLocation && (
        <Text style={styles.resultTitle}>{currentLocation}</Text>
    );

    useEffect(() => {
        if (!coordinates.latitude || !coordinates.longitude) return;
        const getCurrentCityName = async () => {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
            );
            if (response.data.results[0].formatted_address) {
                setCurrentLocation(response.data.results[0].formatted_address);
            }
        };
        getCurrentCityName();
    }, [coordinates]);
    return (
        <View style={{ flex: 1 }}>
            <Text style={commonStyles.mediumBlackText}>
                {t("locationDescription")}
            </Text>
            <View style={{ gap: 15, marginTop: 30 }}>
                <View style={styles.searchContainer}>
                    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <Path
                            d="M10.5417 19.25C15.3512 19.25 19.25 15.3511 19.25 10.5416C19.25 5.73217 15.3512 1.83331 10.5417 1.83331C5.73223 1.83331 1.83337 5.73217 1.83337 10.5416C1.83337 15.3511 5.73223 19.25 10.5417 19.25Z"
                            stroke="#262626"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <Path
                            d="M20.1667 20.1667L16.9231 16.923"
                            stroke="#262626"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </Svg>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={t("searchLocation")}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
                <Pressable
                    onPress={handleUseCurrentLocation}
                    style={styles.currentLocation}
                >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M17.3047 2.69448L4.79599 6.5765C1.82614 7.49574 1.78371 11.6818 4.73235 12.6647L8.16888 13.8102C9.12348 14.1284 9.87301 14.8779 10.1912 15.8325L11.3367 19.2691C12.3196 22.2177 16.4986 22.1682 17.4249 19.2054L21.3069 6.69671C22.0706 4.23598 19.7654 1.93081 17.3047 2.69448Z"
                            fill="#5271FF"
                        />
                    </Svg>
                    <Text>{t("useCurrentLocation")}</Text>
                </Pressable>
                {renderCurrentLocation}

                <FlatList
                    data={locationResults}
                    keyExtractor={(item) => item.place_id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.resultItem}
                            onPress={() => handleSelectLocation(item.place_id)}
                        >
                            <Text style={styles.resultSubtitle}>
                                {item.structured_formatting.secondary_text}
                            </Text>
                            <Text style={styles.resultTitle}>
                                {item.structured_formatting.main_text}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
            <PrimaryButton label={t("continue")} onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        alignItems: "flex-end",
        width: "100%",
    },
    currentLocation: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    searchContainer: {
        borderColor: COLORS.greyBorder,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        paddingVertical: 5,
        borderRadius: 8,
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingHorizontal: 8,
        marginBottom: 16,
        justifyContent: "flex-end",
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        backgroundColor: COLORS.white,
        paddingRight: 10,
        textAlign: "right",
    },
    currentLocationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    currentLocationText: {
        fontSize: 16,
        color: "#000",
    },
    resultHeader: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    resultItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        gap: 5,
        width: "100%",
    },
    resultTitle: {
        textAlign: "right",
        fontSize: 16,
        color: "#000",
    },
    resultSubtitle: {
        fontSize: 14,
        textAlign: "right",
        color: "#666",
    },
});

export default Index;
