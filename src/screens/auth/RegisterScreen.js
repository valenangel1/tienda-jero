import React, {use, useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../constants/colors"
import { auth } from '../../services/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
const RegisterScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const validateInputs = () => {
        if (!name.trim()) {
            Alert.alert("Error", "El nombre y apellido es obligatorio.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user || !emailRegex.test(user)) {
            Alert.alert("Error", "Ingrese un correo electrónico valido.");
            return false;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password || !passwordRegex.test(password)) {
            Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
            return false;
        }
        return true;
    }

    const handlerRegister = () => {
        if (!validateInputs()) {
            return;
        }
        
        createUserWithEmailAndPassword(auth, user, password)
        .then((userCredencials) => {
            const user = userCredencials.user

            updateProfile(user, {
                displayName : name,
            }).then(() => {
                setSuccess(true);
                setTimeout(() => {
                    console.log("🔄️ Redirigiendo a Login...")
                    navigation.navigate("Login")
                }, 2000);
            }).catch((error) => {
                setError(true)
                setErrorMessage(error.message)
            })
        })
        .catch((error) => {
            setError(true)
            setErrorMessage(error.message);
        })
    };

    return (
        <LinearGradient colors={[colors.fondoClaro, colors.fondoOscuro]} style={styles.container}>
            <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain"/>
            <Text style={styles.title}>Registro</Text>
            <TextInput 
            style={styles.input} 
            placeholder="Nombre y Apellido" 
            value={name} 
            onChangeText={setName}
            />
            <TextInput
            style={styles.input}
            placeholder="Correo Electronico"
            keyboardType="email-address"
            value={user}
            onChangeText={setUser}
            />
            <View style={styles.passwordContainer}>
                <TextInput 
                style={styles.passwordInput}
                placeholder="Contraseña"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
                />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="gray"/>
            </TouchableOpacity>
            </View>
            {error && ( <Text style={styles.error}>{errorMessage}</Text>)}
            {success && <Text style={styles.success}>Registro exitoso. Redirigiendo...</Text>}
            <TouchableOpacity style={styles.button} onPress={handlerRegister}>
                <Text style={styles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>¿Ya tienes cuenta? Iniciar sesion</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 5,
        marginBottom: 10
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        width: "80%",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    link: {
        marginTop: 10,
        color: "#007bff"
    },
    error: {
        color: "red",
        marginBottom: 10 
    },
    success: {
        color: "green",
        marginBottom: 10
    },
    logo: {
        width:200,
        height:200,
        marginBottom: 20,
    }
});

export default RegisterScreen