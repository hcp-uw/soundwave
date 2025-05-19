import { useState } from "react";
import { View, TextInput, Text, Alert, StyleSheet, Image } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface master_login {
  email: string;
  password: string;
}

type RootStackParamList = {
  home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "home">;

export default function MasterLogin() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (email: string, password: string) => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential: any) => {
  //       const user = userCredential.user;
  //       console.log("User signed up:", user);
        navigation.navigate("home");
  //     })
  //     .catch((error: unknown) => {
  //       if (error instanceof Error) {
  //         console.error("Error signing up:", error.message);
  //       } else {
  //         console.error("Unknown error signing up:", error);
  //       }
  //     });
  };

  const handleSignIn = (email: string, password: string) => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential: any) => {
  //       const user = userCredential.user;
  //       console.log("User signed in:", user);
         navigation.navigate("home");
  //     })
  //     .catch((error: unknown) => {
  //       if (error instanceof Error) {
  //         console.error("Error signing in:", error.message);
  //       } else {
  //         console.error("Unknown error signing in:", error);
  //       }
  //     });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../components/logos/logo2.png')}
              style={{ 
                    width: 175,
                    height: 185, 
              }} 
        />
      <Text style={styles.subtitle}>welcome to</Text>
      <Text style={styles.title}>soundwave</Text>
      {/* <Image source={}></Image> */}

      <TextInput
        placeholder="email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button label="Sign Up" onPress={() => handleSignUp(email, password)} />
        <Button label="Sign In" onPress={() => handleSignIn(email, password)} />
          
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6a8b8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    letterSpacing: 3,
    fontFamily: "Afacad",
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
    marginTop: -7,
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Afacad",
    fontWeight: "light",
    marginTop: 10,
    color: "#black",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Afacad",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    color: "#551A2D",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    width: "35%",
  },
});

