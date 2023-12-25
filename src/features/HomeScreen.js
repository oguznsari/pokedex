import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetPokemonsQuery } from "../app/services/pokemonApi";
import { Feather } from "@expo/vector-icons";

const BASE_IMAGE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home";

export default function HomeScreen({ navigation }) {
  const { data: pokemons, isLoading, isError } = useGetPokemonsQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* <Button
        title="Go to Settings Screen"
        onPress={() => navigation.navigate("Settings")}
      /> */}
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <Image
              style={{ width: 64, height: 64 }}
              source={{ uri: `${BASE_IMAGE_URL}/${item.pokemonId}.png` }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "dodgerblue",
          borderRadius: 32,
          width: 64,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Add")}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
