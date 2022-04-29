import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { auth, signInWithEmailAndPassword } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await AsyncStorage.setItem("uid", user.user.uid);
        setLoad(false);
        setEmail("")
        setPassword("")
        navigation.push("Home");
      })
      .catch((error) => {
        setLoad(false);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#62BBCF",
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titletextContainer}>Sign In  |  Kitchen Diaries</Text>
        </View>

        <View style={styles.lottieContainer}>
          <LottieView source={require("../assets/lottie/24462-happy-toast.json")} autoPlay={true} loop={true} />
        </View>

        <View style={styles.introContainer}>
          <Text style={styles.introtextContainer}>
          Sign In.
          </Text>
          <Text style={styles.introsubContainer}>
          or create an account in Kitchen Diaries.
          </Text>
        </View>

        <View style={styles.textboxContainer}>
          <TextInput
            label="Email"
            mode={"outlined"}
            value={email}
            autoComplete={false}
            right={<TextInput.Icon name="email" color={"#32708F"} />}
            style={{ marginBottom: 1 }}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
          />
          <TextInput
            label="Password"
            mode={"outlined"}
            value={password}
            autoComplete={false}
            secureTextEntry={!visible}
            right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => setVisible(!visible)} color={"#32708F"} />}
            onChangeText={(text: string) => setPassword(text)}
          />
          <View style={styles.forgotpwContainer}>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Forgetpsw")}>
              Forgot Password?
            </Text>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Signup")}>
              Sign Up?
            </Text>
          </View>
        </View>

        <Button
          loading={load}
          title={"S I G N   I N"}
          buttonStyle={{
            padding: 7,
            marginTop: 30,
            borderRadius: 5,
            marginHorizontal: 20,
            backgroundColor: "#32708F",
            width: "60%",
            marginLeft: 70,
          }}
          onPress={loginHandler}
          titleStyle={styles.buttontitleContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#62BBCF",
    justifyContent: "center",
  },
  lottieContainer: {
    flex: 0.4,
    marginTop: 50,
    backgroundColor: "#62BBCF",
  },
  titleContainer: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#32708F",
  },
  titletextContainer: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "poppins-regular",
  },
  subtitleContainer: {
    padding: 20,
    fontSize: 17,
    color: "black",
    fontWeight: "500",
    textAlign: "center",
  },
  textboxContainer: {
    flex: 0,
    paddingHorizontal: 20,
    backgroundColor: "#62BBCF",
    justifyContent: "center",
  },
  buttontitleContainer: {
    color: "#ffff",
    fontFamily: "poppins-bold",
    fontWeight: "bold",
  },
  forgotpwContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#62BBCF",
    justifyContent: "space-between",
  },
  forgotpwtextContainer: {
    fontSize: 15,
    color: "#32708F",
    fontWeight: "bold",
    paddingVertical: 0,
    textDecorationLine: "underline",
  },
  introContainer: {
    flex: 0.2, 
    borderWidth: 0, 
    marginLeft: 25, 
    backgroundColor: "#62BBCF"
  },
  introtextContainer: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 0,
    color: "#023e8a"
  },
  introsubContainer: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#32708F',
    fontFamily: 'poppins-bold',
  },
});
