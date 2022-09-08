import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContextProvider } from "../context/themeContext";
import Home from "../pages/Home";

const Stack = createNativeStackNavigator();

type routerProps = {
    theme: string;
}

const Router = () =>
    <ThemeContextProvider>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </ThemeContextProvider>


export default Router;