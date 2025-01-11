import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const { width } = Dimensions.get("window");

    return (
        <View style={[styles.tabBar, { width }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                // Render the custom center button for the middle tab
                if (route.name === "chat") {
                    return (
                        <TouchableOpacity
                            key={route.name}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.centerButton}
                        >
                            <Ionicons
                                name="search"
                                size={30}
                                color={isFocused ? "#fff" : "#000"}
                            />
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tab}
                    >
                        <Ionicons
                            name={
                                route.name === "index"
                                    ? isFocused
                                        ? "home"
                                        : "home-outline"
                                    : route.name === "account"
                                    ? isFocused
                                        ? "person"
                                        : "person-outline"
                                    : "help"
                            }
                            size={24}
                            color={isFocused ? "tomato" : "gray"}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 70,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -30, // Floating effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
});
