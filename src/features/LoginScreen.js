import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../app/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("oguzn.sari@gmail.com");
  const [password, setPassword] = useState("123456");
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log({ user });
        await AsyncStorage.setItem("email", user.email);
        // @ts-ignore
        navigation.navigate("HomeStack");

        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log({ user });
        await AsyncStorage.setItem("email", user.email);

        // @ts-ignore
        navigation.navigate("HomeStack");
        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Button title="Kayıt Ol" onPress={handleSignUp} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    margin: 8,
  },
});
