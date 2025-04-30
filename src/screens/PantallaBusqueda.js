import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';
import { ProductosPorCategoria } from '../constants/ProductosPorCategoria';

const PantallaBusqueda = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState("");

  const resultadosFiltrados = ProductosPorCategoria
    .map((categoria) => {
      const categoriaNombre = categoria.nombre || "";
      const categoriaCoincide = categoriaNombre.toLowerCase().includes(busqueda.toLowerCase());

      const productosFiltrados = (categoria.productos || []).filter((producto) => {
        const productoNombre = producto.name || "";
        return productoNombre.toLowerCase().includes(busqueda.toLowerCase());
      });

      if (categoriaCoincide || productosFiltrados.length > 0) {
        return {
          ...categoria,
          productos: categoriaCoincide ? categoria.productos : productosFiltrados,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  return (
    <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
      <View style={styles.barraBusqueda}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="¿Qué estás buscando?"
          value={busqueda}
          onChangeText={setBusqueda}
          autoFocus
        />
      </View>

      {resultadosFiltrados.length > 0 ? (
        <FlatList
          data={resultadosFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.categoriaContainer}>
              {/* Mostrar Banner si hay imagen de categoría */}
              {item.imagen && (
                <TouchableOpacity style={styles.bannerContainer}>
                  <Image source={{ uri: item.imagen }} style={styles.bannerImagen} resizeMode="cover" />
                  <View style={styles.overlay}>
                    <Text style={styles.bannerTitulo}>{item.nombre}</Text>
                  </View>
                </TouchableOpacity>
              )}

              {/* Mostrar productos */}
              {item.productos.length > 0 && (
                <View style={styles.productosContainer}>
                  {item.productos.map((producto) => (
                    <View key={producto.id} style={styles.productoItem}>
                      {producto.image && (
                        <Image source={producto.image} style={styles.productoImagen} />
                      )}
                      <Text style={styles.productoNombre}>{producto.name}</Text>
                      <Text style={styles.productoPrecio}>${producto.price}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View style={styles.sinResultadosContainer}>
          <Text style={styles.sinResultados}>Sin resultados para "{busqueda}"</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent'
  },
  categoriaContainer: {
    marginBottom: 30
  },
  bannerContainer: {
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10
  },
  bannerImagen: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerTitulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  productosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  productoItem: {
    width: '48%',
    marginBottom: 15,
    marginRight: '2%'
  },
  productoImagen: {
    width: '100%',
    height: 100,
    borderRadius: 8
  },
  productoNombre: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5
  },
  productoPrecio: {
    fontSize: 13,
    color: 'green',
    marginTop: 2
  },
  sinResultadosContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  sinResultados: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10
  },
});

export default PantallaBusqueda;
