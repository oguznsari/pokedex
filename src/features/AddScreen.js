import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAddPokemonMutation } from "../app/services/pokemonApi";
import { useNavigation } from "@react-navigation/native";

const AddScreen = () => {
  const [addPokemon, state] = useAddPokemonMutation();
  const navigation = useNavigation();

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    pokemonId: Yup.number().required("Required"),
  });

  return (
    <View>
      <Formik
        initialValues={{
          name: "",
          pokemonId: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          addPokemon(values).then(() => {
            if (!state.error) {
              navigation.goBack();
            }
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Pokemon Adı"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && <Text>{errors.name}</Text>}
            <TextInput
              style={styles.textInput}
              placeholder="Pokemon Id"
              onChangeText={handleChange("pokemonId")}
              onBlur={handleBlur("pokemonId")}
              value={values.pokemonId}
            />
            {errors.pokemonId && <Text>{errors.pokemonId}</Text>}
            {/* @ts-ignore */}
            <Button title="Ekle" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    margin: 8,
  },
});
