import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CarritoIcono = ({ cantidad = 0, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Ionicons name="cart-outline" size={24} color="#000" />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{cantidad}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10, 
    width: 48,
    height: 48,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CarritoIcono;

