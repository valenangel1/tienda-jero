import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, CommonActions } from "@react-navigation/native";
import colors from "../constants/colors";

const PagoScreen = ({ route }) => {
  const navigation = useNavigation();
  const productos = route.params?.productos || [];

  const total = productos.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  const confirmarPago = () => {
    Alert.alert(
      "Confirmación",
      "¿Deseas confirmar tu compra?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => {
            Alert.alert("¡Gracias!", "Tu pago ha sido confirmado.", [
              {
                text: "OK",
                onPress: () => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "Home" }],
                    })
                  );
                }
              }
            ]);
          }
        }
      ]
    );
  };

  return (
    <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
      <Text style={styles.title}>Resumen de Pago</Text>
      <ScrollView style={styles.scroll}>
        {productos.map((item, index) => (
          <View key={index} style={styles.producto}>
            <Text style={styles.nombre}>{item.name}</Text>
            <Text style={styles.detalle}>
              Cantidad: {item.cantidad} - Subtotal: ${item.price * item.cantidad}
            </Text>
          </View>
        ))}
        <Text style={styles.total}>Total a pagar: ${total.toLocaleString()}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.boton} onPress={confirmarPago}>
        <Text style={styles.botonTexto}>Confirmar Pago</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scroll: {
    marginBottom: 20,
  },
  producto: {
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detalle: {
    fontSize: 14,
    color: "#555",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PagoScreen;
