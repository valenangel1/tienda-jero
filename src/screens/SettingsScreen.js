import React, { useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebaseConfig";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import EditModal from "../components/EditModal";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";


const SettingsScreen = () => {
    const navigation = useNavigation()
    const { user } = useAuth()
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] =useState("")
    const [fieldValue, setFieldValue] = useState("")

    const handleEdit = (field) => {
        setModalTitle(field)
        setFieldValue (
            field === 'Nombre' ? user?.displayName || '': 
            field === 'Correo' ? user?.email || '' :
            field === 'Contraseña' ? '' : ''
        );
        setModalVisible(true)
    };

    const handleSave = async () => {
        try {
            if (modalTitle === 'Nombre'){
                await updateProfile(auth.currentUser, { displayName: fieldValue });
                showMessage({
                    message: '✅',
                    description: 'Nombre actualizado correctamente.',
                    type: 'success',
                });
            } else if (modalTitle === 'Correo'){
                await updateEmail(auth.currentUser, fieldValue);
                showMessage({
                    message: '📨',
                    description: 'Correo actualizado correctamente.',
                    type: 'success',
                });
            } else if (modalTitle === 'Contraseña'){
                await updatePassword(auth.currentUser, fieldValue);
                showMessage({
                    message: '🔐',
                    description: 'Contraseña actualizada correctamente.',
                    type: 'success',
                });
            }
        }catch(error){
            showMessage({
                message: '❌',
                description: error.message,
                type: 'danger',
            })
        }
        finally {
            setModalVisible(false);
        }
    }

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <Text style={styles.subtitle}>Ajustes sobre tu cuenta</Text>
            <View style={styles.row}>
                <View style={styles.info}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.infoText}>{user?.displayName || 'Sin nombre'}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Nombre')}>
                    <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.info}>
                    <Text style={styles.label}>Correo electronico</Text>
                    <Text style={styles.infoText}>{user?.email || 'Sin correo'}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Correo')}>
                    <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.info}>
                    <Text style={styles.label}>Nueva contraseña</Text>
                    <Text style={styles.infoText}>**************</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit('Contraseña')}>
                    <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
            </View>
            <EditModal
            visible={isModalVisible}
            title={modalTitle}
            value={fieldValue}
            onChangeText={setFieldValue}
            onSave={handleSave} onCancel={() => setModalVisible(false)}/>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    subtitle: {
        fontSize: 24,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    info: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: "#666",
    },
    infoText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    editButton: {
        backgroundColor: "#007bff",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    editText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
})

export default SettingsScreen