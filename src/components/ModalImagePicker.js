import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import colors from "../constants/colors";

const ModalImagePicker = ({ visible, imageUri, onChooseImage, onSave, onCancel }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cambiar Foto de Perfil</Text>
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                    <TouchableOpacity style={styles.imageButton} onPress={onChooseImage}>
                        <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "black",
        textAlign: 'center',
    },
    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: "#088",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        backgroundColor: "#ccc",
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: "#007bff",
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalImagePicker