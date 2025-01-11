import * as React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import Index from ".";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../../constants/Colors";
import Chat from "./chat";

type RootTabParamList = {
    Home: undefined;
    Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type CustomTabBarButtonProps = {
    children: React.ReactNode;
    onPress: () => void;
};

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
    children,
    onPress,
}) => (
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
        {children}
    </TouchableOpacity>
);

// Main App Component
export default function Layout() {
    return (
        <SafeAreaProvider style={{ paddingHorizontal: 25 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Index}
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <Svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <Path
                                        d="M20.83 8.01002L14.28 2.77002C13 1.75002 11 1.74002 9.72996 2.76002L3.17996 8.01002C2.23996 8.76002 1.66996 10.26 1.86996 11.44L3.12996 18.98C3.41996 20.67 4.98996 22 6.69996 22H17.3C18.99 22 20.59 20.64 20.88 18.97L22.14 11.43C22.32 10.26 21.75 8.76002 20.83 8.01002ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z"
                                        fill={focused ? "#5271FF" : "#B0BEC5"} // Change color based on active state
                                    />
                                </Svg>
                            </View>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <Svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <Path
                                        d="M17 2H7C4.24 2 2 4.23 2 6.98V12.96V13.96C2 16.71 4.24 18.94 7 18.94H8.5C8.77 18.94 9.13 19.12 9.3 19.34L10.8 21.33C11.46 22.21 12.54 22.21 13.2 21.33L14.7 19.34C14.89 19.09 15.19 18.94 15.5 18.94H17C19.76 18.94 22 16.71 22 13.96V6.98C22 4.23 19.76 2 17 2ZM13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75ZM17 8.75H7C6.59 8.75 6.25 8.41 6.25 8C6.25 7.59 6.59 7.25 7 7.25H17C17.41 7.25 17.75 7.59 17.75 8C17.75 8.41 17.41 8.75 17 8.75Z"
                                        fill={focused ? "#5271FF" : "#B0BEC5"}
                                    />
                                </Svg>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={Chat}
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <Svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <Path
                                        d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                                        stroke="#262626"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <Path
                                        d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                                        stroke="#262626"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <Path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="#262626"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </Svg>
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        bottom: 30,
        height: 70,
        borderRadius: 16, // Rounded corners for the floating effect
        backgroundColor: COLORS.white, // Background color of the tab bar
        elevation: 10, // Shadow for Android
        borderColor: COLORS.white,
        display: "flex",
        flexDirection: "row", // Ensure horizontal layout
        justifyContent: "space-around", // Distribute tab buttons evenly
        alignItems: "center", // Center the buttons vertically
    },
    customButton: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        margin: "auto",
    },
    icon: {
        fontSize: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
