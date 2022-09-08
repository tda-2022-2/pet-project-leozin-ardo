import { StatusBar } from "expo-status-bar";
import React from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../context/themeContext";

export default () => {

    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={{ color: theme.colors.primary }}>Open up App.tsx to start working on your apsp!</Text>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
