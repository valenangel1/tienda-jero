import React, {useEffect} from "react";
import { Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

import react from "react";

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('MainTabs')}, 8000);
            return () => clearTimeout(timer)
    })
    return (
        <LinearGradient colors={colors.gradientPrimario} style={styles.container}>
            <Image source={ require("../../assets/logo.png")} style={styles.logo}/>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 1100,
        height: 500,
        resizeMode: 'contain',
    }

});

export default SplashScreen