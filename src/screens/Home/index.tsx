import { StatusBar } from "expo-status-bar";
import React from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Background from "../../components/Background";
import { useTheme } from "../../context/themeContext";

export default () => {

    const { theme } = useTheme();

    return (
        <Background>
            <View>
                <Text style={{ color: theme.colors.primary }}>Open up App.tsx to start working on your apsp!</Text>
                <StatusBar style="auto" />
            </View>
        </Background>
    )
}