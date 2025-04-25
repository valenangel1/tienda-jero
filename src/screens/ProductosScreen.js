import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CarritoIcono from "../components/CarritoIcono";
import colors from "../constants/colors";
import { list } from "firebase/storage";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window")
const ITEM_WIDTH = (width / 2) -25;

const ProductosScreen = ({ route }) => {
    const navigation = useNavigation();
    const { nombreCategoria, productos } = route.params;
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toLocaleString()}</Text>
            <TouchableOpacity style={styles.button} onPress={() => agregarAlCarrito(item)}>
                <Text style={styles.buttonText}>Agregar al carrito</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Productos - {nombreCategoria}</Text>
                <CarritoIcono cantidad={carrito.length} onPress={() => navigation.navigate("CarritoCompras", { productos: carrito})} />
                </View>
            </View>

            <FlatList data={productos} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={styles.list} numColumns={2}/>
        </LinearGradient>
    )
}

 const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    list: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    productContainer: {
        width: ITEM_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        margin: 7,
        alignItems: "center",
        elevation: 3
    },
    image: {
        width: 140,
        height: 120,
        borderRadius: 10,
        marginBottom: 10
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center"
    },
    price: {
        fontSize: 16, 
        color: "green",
        marginBottom: 10
    },
    button: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8
    },
    buttonText: {
        color: "#fff"
    },
 })

 export default ProductosScreen