import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 
import colors from '../constants/colors'; 

const PantallaBusqueda = () => {
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);

  const resultadosFiltrados = productos.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarBusquedaComoProducto = () => {
    if (busqueda.trim() === "") return;

    const yaExiste = productos.some(item => item.nombre.toLowerCase() === busqueda.toLowerCase());
    if (!yaExiste) {
      const nuevoProducto = {
        id: (productos.length + 1).toString(),
        nombre: busqueda,
      };
      setProductos([nuevoProducto, ...productos]);
      Alert.alert("Guardado", `"${busqueda}" ha sido añadido como producto.`);
      setBusqueda("");
    } else {
      Alert.alert("Ya existe", `"${busqueda}" ya está en la lista.`);
    }
  };

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
          onSubmitEditing={agregarBusquedaComoProducto}
        />
      </View>

      {resultadosFiltrados.length > 0 ? (
        <FlatList
          data={resultadosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultadoItem}>
              <Text>{item.nombre}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.sinResultadosContainer}>
          <Text style={styles.sinResultados}>Sin resultados para "{busqueda}"</Text>
          <TouchableOpacity style={styles.botonGuardar} onPress={agregarBusquedaComoProducto}>
            <Text style={styles.textoGuardar}>Guardar como nuevo producto</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30, 
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  resultadoItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sinResultadosContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  sinResultados: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10,
  },
  botonGuardar: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoGuardar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PantallaBusqueda;
