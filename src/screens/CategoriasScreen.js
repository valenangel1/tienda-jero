import React, { use, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import CarritoIcono from "../components/CarritoIcono";
import { ProductosPorCategoria } from "../constants/ProductosPorCategoria";
import { useFocusEffect } from "@react-navigation/native";

const categorias = [
    { name: 'Carne', icon: 'cow', screen: 'Carne'},
    { name: 'Pescado', icon: 'fish', screen: 'Pescado'},
    { name: 'Mantequilla', icon: 'bowl-mix', screen: 'Mantequilla'},
    { name: 'Aceite', icon: 'oil', screen: 'Aceites'},
    { name: 'Salsas y Aderezos', icon: 'bottle-soda-classic', screen: 'SalsasAderezos'},
    { name: 'Conservas Vegetales', icon: 'food-variant', screen: 'ConservasVegetales'},
    { name: 'Macro Snacks', icon: 'cookie', screen: 'Snacks'},
    { name: 'Gelatinas', icon: 'cupcake', screen: 'Gelatinas'},
    { name: 'Condimientos y Especias', icon: 'chili-mild', screen: 'CondimentosEspecias'},
    { name: 'Dulces y Confitería', icon: 'candy', screen: 'Dulces'},
    { name: 'Bebidas Instantáneas', icon: 'tea', screen: 'BebidasInstantaneas'},
    { name: 'Productos Lácteos', icon: 'cheese', screen: 'Lácteos'},
    { name: 'Endulzantes', icon: 'leaf', screen: 'Endulzantes'},
    { name: 'Cereales y Granos', icon: 'grain', screen: 'CerealesGranos'},
    { name: 'Iluminación Decorativa', icon: 'lightbulb-on-outline', screen: 'Iluminacion'},
    { name: 'Productos de Limpieza', icon: 'spray-bottle', screen: 'Limpieza'},
    { name: 'Cuidado de Ropa', icon: 'tshirt-crew', screen: 'CuidadoRopa'},
    { name: 'Endulzantes Naturales', icon: 'leaf-maple', screen: 'EndulzantesNaturales'},
    { name: 'Harinas y Almidones', icon: 'sack', screen: 'HarinasAlmidones'},
]

const CategoriasScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");

    const productosEnCarrito = [];

    const filteredCategories = categorias.filter((item) => 
    item.name.toLowerCase().includes(searchText.toLowerCase()));

    useFocusEffect(
        React.useCallback(() => {
            setSearchText(''); 
        }, [])
    );

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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color="black" style={{ marginRight: 10}} />
                    </TouchableOpacity>

                    <View style={styles.searchBox}>
                        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
                        <TextInput
                        style={{ flex: 1, color: 'gray'}}
                        placeholder="Buscar categoría..."
                        placeholderTextColor="gray"
                        value={searchText}
                        onChangeText={setSearchText}
                        />
                    </View>

                    <CarritoIcono
                    cantidad={productosEnCarrito.length}
                    onPress={() => navigation.navigate('CarritoCompras', { productos: productosEnCarrito})} />
                </View>

                <Text style={styles.title}>Todas las Categorías</Text>

                <View style={styles.gridContainer}>
                    {filteredCategories.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.gridItem} onPress={() => goToCategory(item.screen)}>
                            <MaterialCommunityIcons name={item.icon} size={45} color="black" />
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: 12
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 10
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    searchIcon: {
        marginRight: 5
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#000",
        textAlign:'center',
        marginBottom: 10
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 20
    },
    gridItem: {
        width: "48%",
        marginBottom: 15,
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2
    },
    categoryText: {
        fontSize: 16,
        marginTop: 5,
        textAlign: "center"
    },
})


export default CategoriasScreen