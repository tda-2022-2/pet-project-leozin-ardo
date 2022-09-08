import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
    NavigationContainer,
    Theme as NavigationTheme,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { pokedexTheme } from '../theme/colors';

export type Theme = NavigationTheme;

const lightTheme: Theme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...pokedexTheme.light.colors
    },
};

const darkTheme: Theme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...pokedexTheme.dark.colors
    },
};

export type ThemeType = 'dark' | 'light';

export interface ThemeContextValue {
    theme: Theme;
    themeType: ThemeType;
    isDarkTheme: boolean;
    toggleThemeType: () => void;
    setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
    theme: lightTheme,
    themeType: 'light',
    isDarkTheme: false,
    setThemeType: () => { },
    toggleThemeType: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    const colorScheme = useColorScheme();
    const [themeType, setThemeType] = useState<ThemeType>(colorScheme || 'light');

    const toggleThemeType = useCallback(() => {
        setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
    const theme = useMemo(
        () => (isDarkTheme ? darkTheme : lightTheme),
        [isDarkTheme],
    );

    return (
        <NavigationContainer theme={theme}>
            <ThemeContext.Provider
                value={{
                    theme,
                    themeType,
                    isDarkTheme,
                    setThemeType,
                    toggleThemeType,
                }}>
                {children}
            </ThemeContext.Provider>
        </NavigationContainer>
    );
};