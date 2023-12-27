import { Button, StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../app/services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    signOut(auth)
      .then(async () => {
        console.log("Sign-out successful.");
        await AsyncStorage.removeItem("email");
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: "LoginScreen" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
