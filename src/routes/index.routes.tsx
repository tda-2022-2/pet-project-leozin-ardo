import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "../components/Header";
import { ThemeContextProvider } from "../context/themeContext";
import Home from "../screens/Home";


const Drawer = createDrawerNavigator();
const screenMap = [{ name: "Home", component: Home }]

const screens = screenMap.map((screen, index) => <Drawer.Screen key={index} name={screen.name} component={screen.component} options={{ headerRight: () => <Header /> }} />);

const Router = () =>
    <ThemeContextProvider>
        <Drawer.Navigator initialRouteName="Home">
            {screens}
        </Drawer.Navigator>
    </ThemeContextProvider>


export default Router;