import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CarritoIcono from "../components/CarritoIcono";
import { ProductosPorCategoria } from "../constants/ProductosPorCategoria";

const { width: screenWidth } = Dimensions.get("window");

const categories = [
    { name: 'Carne', icon: 'cow', screen: 'Carne' },
    { name: 'Conservas Vegetales', icon: 'food-variant', screen: 'ConservasVegetales' },
    { name: 'Productos de Limpieza', icon: 'spray-bottle', screen: 'Limpieza' },
    { name: 'Salsa y Aderezos', icon: 'bottle-soda-classic', screen: 'SalsasAderezos' },
    { name: 'Dulces y Confitería', icon: 'candy', screen: 'Dulces' },
    { name: 'Productos Lácteos', icon: 'cheese', screen: 'Lácteos' },
];

const carouselItems = [
    { title: 'Promoción de Carne', image: require('../../assets/carne.jpg') },
    { title: 'Oferta de Legumbres', image: require('../../assets/legumbres.jpg') },
    { title: 'Descuento en Lácteos', image: require('../../assets/lacteos.jpg') },
    { title: 'Productos de Limpieza', image: require('../../assets/limpieza.jpg') },
    { title: 'Hortalizas', image: require('../../assets/hortalizas.jpg') },
    { title: 'Variedad de Mecato', image: require('../../assets/mecato.jpg') }
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const productosEnCarrito = [];

    const goToCategory = (screenName) => {
        const categoriaSeleccionada = ProductosPorCategoria.find((cat) => cat.screen === screenName);
        if (categoriaSeleccionada) {
            navigation.navigate("ProductosScreen", {
                nombreCategoria: categoriaSeleccionada.nombre,
                productos: categoriaSeleccionada.productos
            });
        } else {
            console.warn("Categoría no encontrada:", screenName);
        }
    };

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity style={styles.searchBox} onPress={() => navigation.navigate("PantallaBusqueda")}>
                        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
                        <Text style={{ color: "gray" }}>Buscar en Tienda Jero</Text>
                    </TouchableOpacity>

                    <CarritoIcono
                        cantidad={productosEnCarrito.length}
                        onPress={() => navigation.navigate("CarritoCompras", { productos: productosEnCarrito })}
                    />
                </View>

                <View style={styles.carouselWrapper}>
                    <Carousel
                        width={screenWidth}
                        height={200}
                        autoPlay
                        loop
                        data={carouselItems}
                        scrollAnimationDuration={3000}
                        onSnapToItem={(index) => setActiveIndex(index)}
                        renderItem={({ item }) => (
                            <View style={styles.carouselItemContainer}>
                                <Image source={item.image} style={styles.carouselImage} />
                                <View style={styles.dotContainer}>
                                    {carouselItems.map((_, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.dot,
                                                activeIndex === i ? styles.activeDot : styles.inactiveDot
                                            ]}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.categoryHeader}>
                    <Text style={styles.sectionTitle}>Tus categorías favoritas</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Categorias')}>
                        <Text style={styles.verMas}>Ver Más</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.gridContainer}>
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.gridItem}
                            onPress={() => goToCategory(item.screen)}
                        >
                            <MaterialCommunityIcons name={item.icon} size={45} color="black" />
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: 12,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 5,
    },
    carouselWrapper: {
        position: "relative",
        marginBottom: 20,
    },
    carouselItemContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        alignSelf: "center",
    },
    carouselImage: {
        width: screenWidth * 0.9,
        height: 200,
        resizeMode: "cover",
        borderRadius: 20,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    verMas: {
        color: "#007AFF",
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    gridItem: {
        width: '48%',
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    categoryText: {
        fontSize: 16,
        marginTop: 5,
        textAlign: "center",
    },
    dotContainer: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#fff",
    },
    inactiveDot: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
});

export default HomeScreen;
