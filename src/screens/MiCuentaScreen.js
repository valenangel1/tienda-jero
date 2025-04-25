import React, { useState }from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Alert, Modal } from "react-native"
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAuth } from '../context/AuthContext'
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const MiCuentaScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth()
    const [profileImage, setProfileImage] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleLogout = () => {
        setShowModal(true);
    }

    const selectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permiso requerido", "Se necesita acceso a la galeria para seleccionar una imagen.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const takeImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permiso requerido", "Se necesita acceso a la camara para tomar una foto.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

     const confirmLogout = () => {
        signOut(auth)
        .then(() => navigation.replace("Login"))
        .catch(() => Alert.alert("Error", "No se puede cerrar sesión"));
        setShowModal(false);
     }

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <View style={styles.profileContainer}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage}/>
                ) : (
                    <Image source={require("../../assets/perfil.png")} style={styles.profileImage}/>
                )}
                <TouchableOpacity style={[styles.iconButton, styles.cameraIcon]} onPress={takeImage}>
                    <Icon name="photo-camera" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconButton, styles.galleryIcon]} onPress={selectImage}>
                    <Icon name="photo-library" size={24} />
                </TouchableOpacity>
            </View>
            <Text style={styles.name} >{user?.displayName ||'Usuario'}</Text>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.settingsText}>Ajustes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={confirmLogout}>
                                <Text style={[styles.buttonText, { color: "#007bff"}]}>Si</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    profileContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: "#333",
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "absolute",
    },
    cameraIcon: {
        bottom: 0,
        left: "25%",
    },
    galleryIcon: {
        bottom: 0,
        right: "25%",
    },
    name: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    settingsButton: {
        marginTop: 20,
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    settingsText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 5
    },
    modalText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold"
    },
    modalButtons: {
        flexDirection: "row",
        gap: 20
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#f2f2f2"
    },
    buttonText: {
        fontSize: 16,
    },
});

export default MiCuentaScreen