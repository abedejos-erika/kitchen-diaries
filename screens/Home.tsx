import Header from "../components/Header";
import { onSnapshot, db, doc, query, where, collection } from "../firebase";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }: any) {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    getRecipes()
  }, []);

  async function getRecipes() {
    const uid = await AsyncStorage.getItem("uid");
    const q = query(collection(db, "recipes"), where("uid", "==", uid));
    onSnapshot(q, (querySnapshot) => {
      const array: any = [];
      querySnapshot.forEach((doc) => array.push({ ...doc.data(), id: doc.id }));
      setRecipes(array);
    });
  }

  const ViewRecipe = (recipe: any) => {
    let value = JSON.stringify(recipe);
    navigation.navigate("ViewRecipe", { recipe: value });
  };

  const renderItem = ({ item }: any) => <Item {...item} item={item} />;

  const Item = ({ title, image, desc, id, item }: any) => (
    <TouchableOpacity style={styles.recipe} onPress={() => ViewRecipe(item)} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.desc} numberOfLines={1}>
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={styles.introContainer}>
        <Text style={styles.introtextContainer}>
        My Recipes.
        </Text>
      </View>
      <FlatList
        data={recipes}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#62BBCF",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    padding: 10,
    paddingTop: 50,
    flexDirection: "row",
    backgroundColor: "#32708F",
    fontFamily: "poppins-bold",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
  recipe: {
    height: 170,
    margin: "1%",
    width: "48%",
    elevation: 3,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#32708F",
  },
  detail: {
    padding: 5,
    height: 70,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  desc: {
    marginTop: 5,
    fontSize: 13,
    color: "white",
  },
  image: {
    height: 100,
    width: "100%",
  },
  introContainer: {
    flex: 0, 
    borderWidth: 0, 
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#62BBCF"
  },
  introtextContainer: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 0,
    color: "#32708F"
  },
  headerContent: {
    padding: 10,
    paddingTop: 50,
    flexDirection: "row",
    backgroundColor: "#32708F",
    fontFamily: "poppins-bold",
    justifyContent: "space-between",
  },
});
