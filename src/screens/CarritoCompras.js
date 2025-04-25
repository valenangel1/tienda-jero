import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

const CarritoCompras = ({ route }) => {
    const productos = route.params?.productos || [];

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            {productos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color="gray" style={styles.emptyIcon} />
                    <Text style={styles.textoVacio}>Tu carrito está vacío</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.textoTitulo}>Productos en tu carrito:</Text>
                    {productos.map((producto, index) => (
                        <Text key={index} style={styles.textoProducto}>
                            - {producto.nombre}
                        </Text>
                    ))}
                </View>
            )}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyContainer: {
        alignItems: "center"
    },
    emptyIcon: {
        marginBottom: 10,
    },
    textoVacio: {
        fontSize: 18,
        color: "gray"
    },
    textoTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000"
    },
    textoProducto: {
        fontSize: 16,
        marginVertical: 2,
        color: "#000"
    }
})

export default CarritoCompras