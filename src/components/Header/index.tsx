import React, { useRef, useEffect, useState } from "react";
import { Pressable, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

import { useTheme } from "../../context/themeContext";

export default () => {
  const { toggleThemeType } = useTheme();
  const [themeDark, setThemeDark] = useState(false);
  const animationRef = useRef<LottieView>(null);

  const changeTheme = () => {
    toggleThemeType();
    setThemeDark(!themeDark);

    themeDark
      ? animationRef.current?.play(0, 80)
      : animationRef.current?.play(80, 0);
  };

  return (
    <Pressable onPress={changeTheme}>
      <LottieView
        style={{ width: 30, height: 30, marginRight: 10 }}
        ref={animationRef}
        source={require("../../assets/lottie/theme-button.json")}
        speed={3}
        duration={2000}
        loop={false}
      />
    </Pressable>
  );
};
