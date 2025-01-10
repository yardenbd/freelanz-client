import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Logo from "../assets/images/Logo.svg";
// import { useAppDispatch } from "../utils/hooks";
// import { loadUser } from "../store/features/auth/actions";

const Index = () => {
    const router = useRouter();
    useEffect(() => {
        const tie = setTimeout(() => {
            router.push("/auth/complete-profile");
        }, 1000);
        return () => clearTimeout(tie);
    }, []);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const loadData = async () => {
    //         const { payload } = await dispatch(loadUser());
    //         if (typeof payload !== "string") {
    //             if (!payload?.type) {
    //                 router.push("/auth/role");
    //                 return;
    //             } else if (payload.type) {
    //                 router.push("/auth/profile/address");
    //             }
    //         }
    //     };
    //     loadData();
    // }, []);
    return (
        <LinearGradient
            colors={["#5271FF", "#2E4ACA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.content}>
                <Image source={require("../assets/images/Logo.png")} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Index;
