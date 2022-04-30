import React, { useState } from "react";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { auth, sendPasswordResetEmail } from "../firebase";
import LottieView from "lottie-react-native";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");

  const resetPsw = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email sent successfully");
        navigation.push("Login");
      })
      .catch((error: any) => alert(error));
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#62BBCF" }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titletextContainer}>Reset Password</Text>
        </View>

        <View style={styles.lottieContainer}>
          <LottieView source={require("../assets/lottie/97471-sent-email.json")} autoPlay={true} loop={true} />
        </View>

        <View style={styles.introContainer}>
          <Text style={styles.introtextContainer}>
          Reset Password.
          </Text>
        </View>

        <View style={styles.textboxContainer}>
          <TextInput
            value={email}
            label="Email"
            mode={"outlined"}
            autoComplete={false}
            style={{ marginBottom: 1 }}
            onChangeText={(text: string) => setEmail(text)}
            right={<TextInput.Icon name="email" color={"#32708F"} />}
          />
          <View style={styles.forgotpwContainer}>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Login")}>
              Sign In
            </Text>
            <Text style={styles.forgotpwtextContainer} onPress={() => navigation.navigate("Signup")}>
              Sign Up
            </Text>
          </View>

          <Button
            onPress={resetPsw}
            title={"R E Q U E S T"}
            titleStyle={styles.buttontitleContainer}
            buttonStyle={{ 
              padding: 7, 
              marginTop: 15, 
              borderRadius: 5, 
              backgroundColor: "#32708F",
              width: "70%",
              marginLeft: 50,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#62BBCF",
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
    color: "#1d3557",
    fontWeight: "bold",
    paddingVertical: 0,
    textDecorationLine: "underline",
  },
  introContainer: {
    flex: 0, 
    borderWidth: 0, 
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#62BBCF"
  },
  introtextContainer: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 0,
    color: "#1d3557"
  },
});
