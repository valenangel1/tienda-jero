import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

const CarritoCompras = ({ route }) => {
    const navigation = useNavigation();
    const productos = route.params?.productos || [];

    const total = productos.reduce((acc, item) => acc + item.price * item.cantidad, 0);

    const irAPago = () => {
        navigation.navigate("PagoScreen", { productos });
    };

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={26} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Carrito de Compras</Text>
            </View>

            {productos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color="gray" style={styles.emptyIcon} />
                    <Text style={styles.textoVacio}>Tu carrito está vacío</Text>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.textoTitulo}>Productos en tu carrito:</Text>
                        {productos.map((producto, index) => (
                            <View key={index} style={styles.productoItem}>
                                <Text style={styles.productoNombre}>{producto.name}</Text>
                                <Text style={styles.productoDetalle}>
                                    Cantidad: {producto.cantidad} | Total: ${ (producto.price * producto.cantidad).toLocaleString() }
                                </Text>
                            </View>
                        ))}
                        <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>
                    </ScrollView>

                    <TouchableOpacity style={styles.botonPagar} onPress={irAPago}>
                        <Text style={styles.botonTexto}>Pagar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyIcon: {
        marginBottom: 10,
    },
    textoVacio: {
        fontSize: 18,
        color: "gray",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    textoTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    productoItem: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    productoNombre: {
        fontSize: 16,
        fontWeight: "600",
    },
    productoDetalle: {
        fontSize: 14,
        color: "#444",
        marginTop: 5,
    },
    total: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 10,
    },
    botonPagar: {
        backgroundColor: "#28a745",
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 25,
    },
    botonTexto: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CarritoCompras;
