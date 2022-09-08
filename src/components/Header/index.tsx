import React, { useRef, useEffect, useState } from "react";
import { Pressable, Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

import { useTheme } from "../../context/themeContext"

export default () => {
    const { toggleThemeType, themeType, isDarkTheme } = useTheme();


    return (
        <Pressable onPress={toggleThemeType}>
            <LottieView
                style={{ width: 30, height: 30, marginRight: 10 }}
                ref={(animation) => {
                    if (animation) {
                        isDarkTheme ? animation.play(250, 481) : animation.play(0, 250)
                    }
                }}
                source={require('../../assets/lottie/47047-dark-mode-button.json')}
                speed={3}
                loop={false}

            />
        </Pressable>
    )
}