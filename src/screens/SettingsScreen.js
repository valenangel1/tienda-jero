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
import * as ImagePicker from 'expo-image-picker';
import ModalImagePicker from "../components/ModalImagePicker";



const SettingsScreen = () => {
    const navigation = useNavigation()
    const { user, setUser } = useAuth()
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] =useState("")
    const [fieldValue, setFieldValue] = useState("")
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png';
    const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDDINARYURL
    const UPLOAD_PRESET = process.env.EXPO_PUBLIC_UPLOAD_PRESET
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const [imageUri, setImageUri] = useState(null)


    const handleEdit = (field) => {
        setModalTitle(field)
        if (field === 'Foto de Perfil') {
            setImageModalVisible(true)
        } else {
            setFieldValue (
                field === 'Nombre' ? user?.displayName || '': 
                field === 'Correo' ? user?.email || '' :
                field === 'Contraseña' ? '' : ''
            );
            setModalVisible(true) 
        }
    };

    const HandleBack = () => {
        navigation.goBack()
    }

    useEffect (() => {
        if (user && user.photoURL){
            setImageUri(user.photoURL)
        } else {
            setImageUri(defaultImage)
        }
    }, [user])

    const uploadImage = async () => {
        if (!user || !imageUri) {
            console.error('Usuario o URI de imagen no validos:', { user, imageUri });
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'profile.jpg',
            });
            formData.append('upload_preset', UPLOAD_PRESET);

            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.secure_url) {
                await updateProfile(auth.currentUser, { photoURL: data.secure_url });
                setUser({ ...user, photoURL: data.secure_url });
                setImageUri(data.secure_url);
                showMessage({
                    message: 'Exito',
                    description: 'Foto de perfil actualizada correctamente.',
                    type: 'success',
                });
            } else {
                throw new Error(data.error?.message || 'No se pudo obtener la URL de la imagen subida');
            }
        } catch (error) {
            console.error('Error subiendo la imagen:', error);
            showMessage({
                message: 'Error',
                description: error.message,
                type: 'danger',
            });
        } finally {
            setImageModalVisible(false);
        }
    };

    const handleChooseImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted'){
                showMessage({
                    message: 'Permiso denegado',
                    description: 'Se necesita permiso para acceder a la galeria.',
                    type: 'danger',
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            });

            if (result.canceled) {
                showMessage({
                    message: 'Cancelado',
                    description: 'No se selecciono ninguna imagen.',
                    type: 'info',
                });
                return;
            }

            setImageUri(result.assets[0].uri);
        } catch (error) {
            console.error('Error seleccionando la imagen:', error);
            showMessage({
                message: 'Error',
                description: 'Ocurrio un error al intentar selecionar la imagen.',
                type: 'danger',
            });
        }
    }

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
            } else if (modalTitle === 'Foto de Perfil'){
                await uploadImage();
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
            <TouchableOpacity style={styles.backButton} onPress={HandleBack}>
                <Text style={styles.editButtonText}>Atras</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Ajustes sobre tu cuenta</Text>
           
                <View style={styles.profileSection}>
                    <Text style={styles.itemLabel}>Foto de Perfil</Text>
                    <Image source={{uri: imageUri || defaultImage}} style={styles.profileImage} />
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit("Foto de Perfil")}>
                        <Text style={styles.editButtonText}>Cambiar</Text>
                    </TouchableOpacity>
                </View>
        
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
            onSave={handleSave} 
            onCancel={() => setModalVisible(false)}/>

            <ModalImagePicker 
            visible={isImageModalVisible}
            imageUri={imageUri}
            onChooseImage={handleChooseImage}
            onSave={uploadImage}
            onCancel={() => setImageModalVisible(false)}
            />

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
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: "center",
        backgroundColor: 'transparent',
        paddingVertical: 20
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        marginBottom: 15,
        backgroundColor: '#ccc',
    },
    itemLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        zIndex: 1,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default SettingsScreen