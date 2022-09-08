import { SafeAreaView } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";


type backgroundProps = {
    children: React.ReactNode;
}

export default ({ children }: backgroundProps) => {
    const { theme } = useTheme();
    return (
        <SafeAreaView>
            {children}
        </SafeAreaView>
    );
}