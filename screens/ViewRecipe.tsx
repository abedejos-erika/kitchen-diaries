import React from "react";
import * as Linking from "expo-linking";
import { doc, deleteDoc, db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function ViewRecipe({ navigation, route }: any) {
  const recipe = JSON.parse(route.params.recipe);

  function handleDelete() {
    Alert.alert("Delete", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => removeRecipe() },
    ]);
  }

  async function removeRecipe() {
    await deleteDoc(doc(db, "recipes", recipe.id));
    navigation.navigate("Home");
    alert("Recipe has been deleted.");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="arrow-back" onPress={() => navigation.goBack()} size={24} color="white" />
          <Text style={styles.headerTitle}>View Recipe</Text>
        </View>

        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.recipe}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.desc}>{recipe.desc}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(recipe.link)} style={styles.button} activeOpacity={0.8}>
            <Ionicons name="logo-youtube" size={50} color="white" />
            <Text style={styles.buttonText}>Open Link</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Button
              title={"E D I T"}
              buttonStyle={styles.but}
              titleStyle={styles.buttontitleContainer}
              onPress={() => navigation.navigate("Edit", { recipe: route.params.recipe })}
            />
            <Button title={"D E L E T E"} buttonStyle={styles.but} titleStyle={styles.buttontitleContainer} onPress={handleDelete} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#62BBCF",
  },
  header: {
    padding: 10,
    paddingTop: 50,
    alignItems: "center",
    flexDirection: "row",
    fontFamily: "poppins-bold",
    backgroundColor: "#32708F",
  },
  headerTitle: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
  recipe: {
    padding: 10,
  },
  image: {
    height: 200,
    elevation: 5,
    width: "100%",
  },
  desc: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    color: "#023e8a",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "poppins-bold",
    color: "#023e8a",
  },
  box: {
    height: 300,
    width: "100%",
  },
  button: {
    height: 150,
    width: "100%",
    elevation: 3,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32708F",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontFamily: "poppins-bold",
  },
  row: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  but: {
    width: 150,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#32708F",
  },
  buttontitleContainer: {
    color: "#ffff",
    fontFamily: "poppins-bold",
    fontWeight: "bold",
  },
});
