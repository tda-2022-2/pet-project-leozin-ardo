import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";

type backgroundProps = {
  children: React.ReactNode;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default ({ children }: backgroundProps) => {
  const { theme } = useTheme();

  const style = styles(theme);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={style.box}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = (theme: any) =>
    StyleSheet.create({
        box: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: theme.background,
            paddingTop: 22,
        }
    });
