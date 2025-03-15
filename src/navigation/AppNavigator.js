import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen";
import InicioScreen from "../screens/InicioScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoriasScreen from "../screens/CategoriasScreen";
import MiCuentaScreen from "../screens/MiCuentaScreen";
import App from "../../App";

const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

const TabNavigator = () => {
    return (<Tab.Navigator initialRouteName="Inicio">
        <Tab.Screen name="Inicio" component={InicioScreen} options={{}}/>
        <Tab.Screen name="Home" component={HomeScreen} options={{}}/>
        <Tab.Screen name="Categorias" component={CategoriasScreen} options={{}}/>
        <Tab.Screen name="Mi Cuenta" component={MiCuentaScreen} options={{}}/>
    </Tab.Navigator>)
}

const AppNavigator = () => {
    return (
        <stack.Navigator initialRouteName="Splash">
            <stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
            <stack.Screen name="MainTabs" component={TabNavigator} options={{headerShown: false}}/>
        </stack.Navigator>
    )
}

export default AppNavigator