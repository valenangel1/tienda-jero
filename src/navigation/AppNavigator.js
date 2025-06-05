import React from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoriasScreen from "../screens/CategoriasScreen";
import MiCuentaScreen from "../screens/MiCuentaScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import CarritoCompras from "../screens/CarritoCompras";
import PantallaBusqueda from "../screens/PantallaBusqueda";
import ProductosScreen from "../screens/ProductosScreen";



import App from "../../App";
import SettingsScreen from "../screens/SettingsScreen";
import PagoScreen from "../screens/PagoScreen";



const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

const TabNavigator = () => {
    return (<Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({ tabBarIcon:({color, size})=> {
        let iconName
        if (route.name==="Mi Cuenta"){
            iconName = "person-circle-outline"
        }else if (route.name==="Home"){
            iconName = "home-outline"
        }else if (route.name==="Categorias"){
            iconName = "menu-outline"
        }
        return <Ionicons name={iconName} size={size}/>},
        tabBarActiveColor: "#ffff",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {backgroundColor: "#F8FAFC"}
    })}>
        
        <Tab.Screen name="Home" component={HomeScreen} options={{}}/>
        <Tab.Screen name="Categorias" component={CategoriasScreen} options={{}}/>
        <Tab.Screen name="Mi Cuenta" component={MiCuentaScreen} options={{}}/>
    </Tab.Navigator>)
}

const AppNavigator = () => {
    return (
        <stack.Navigator initialRouteName="Splash">
            <stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
            <stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <stack.Screen name="Registro" component={RegisterScreen} options={{headerShown: false}}/>
            <stack.Screen name="CarritoCompras" component={CarritoCompras} options={{headerShown: false}}/>
            <stack.Screen name="PantallaBusqueda" component={PantallaBusqueda} options={{headerShown: false}}/>
            <stack.Screen name="ProductosScreen" component={ProductosScreen} options={{headerShown: false}}/>
            <stack.Screen name="PagoScreen" component={PagoScreen} options={{headerShown: false}}/>
            <stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
            <stack.Screen name="MainTabs" component={TabNavigator} options={{headerShown: false}}/>
        </stack.Navigator>
    )
}

export default AppNavigator