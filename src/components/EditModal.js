import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";


const EditModal =({ visible, title, value, onChangeText, onSave, onCancel }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TextInput style={styles.modalInput} placeholder={`Nuevo ${title.toLowerCase()}`} value={value} onChangeText={onChangeText}/>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onSave}>
                            <Text style={styles.modalButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
        textAlign: "center",
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: "#000",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        flex: 1,
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor:"#007bff",
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
    }
})

export default EditModal