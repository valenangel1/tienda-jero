import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CarritoIcono from "../components/CarritoIcono";
import colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width / 2) - 25;

const ProductosScreen = ({ route }) => {
    const navigation = useNavigation();
    const { nombreCategoria, productos } = route.params;
    const [carrito, setCarrito] = useState([]);
    const [cantidades, setCantidades] = useState({});

    const estaEnCarrito = (id) => carrito.some(p => p.id === id);

    const agregarAlCarrito = (producto) => {
        if (estaEnCarrito(producto.id)) return;

        const itemConCantidad = { ...producto, cantidad: 1 };
        setCarrito([...carrito, itemConCantidad]);
        setCantidades({ ...cantidades, [producto.id]: 1 });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter(p => p.id !== id));
        const nuevasCantidades = { ...cantidades };
        delete nuevasCantidades[id];
        setCantidades(nuevasCantidades);
    };

    const cambiarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;

        setCantidades({ ...cantidades, [id]: nuevaCantidad });

        setCarrito(prev =>
            prev.map(item =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    };

    const renderItem = ({ item }) => {
        const enCarrito = estaEnCarrito(item.id);
        const cantidad = cantidades[item.id] || 0;

        return (
            <View style={styles.productContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toLocaleString()}</Text>

                {!enCarrito ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => agregarAlCarrito(item)}
                    >
                        <Text style={styles.buttonText}>Agregar al carrito</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.controlContainer}>
                        <TouchableOpacity onPress={() => eliminarDelCarrito(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => cambiarCantidad(item.id, cantidad - 1)}
                            disabled={cantidad <= 1}
                        >
                            <Ionicons
                                name="remove-circle-outline"
                                size={24}
                                color={cantidad <= 1 ? "gray" : "black"}
                                style={styles.controlIcon}
                            />
                        </TouchableOpacity>

                        <Text style={styles.cantidadTexto}>{cantidad}</Text>

                        <TouchableOpacity onPress={() => cambiarCantidad(item.id, cantidad + 1)}>
                            <Ionicons
                                name="add-circle-outline"
                                size={24}
                                color="black"
                                style={styles.controlIcon}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Productos - {nombreCategoria}</Text>
                    <CarritoIcono
                        cantidad={carrito.length}
                        onPress={() => navigation.navigate("CarritoCompras", { productos: carrito })}
                    />
                </View>
            </View>

            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                numColumns={2}
            />
        </LinearGradient>
    );
};

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
        elevation: 3,
    },
    image: {
        width: 140,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    price: {
        fontSize: 16,
        color: "green",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
    },
    controlContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        gap: 8,
    },
    cantidadTexto: {
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 4,
    },
    controlIcon: {
        marginHorizontal: 2,
    },
});

export default ProductosScreen;
