import { useState } from "react";
import { View, TextInput, Text, Alert, StyleSheet } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import {Button } from "@/components/Button";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


//import { sendData } from "../../api";



interface master_login {
    email: string;
    password: string;
}

type RootStackParamList = {
    home: undefined;
}

type NavigationProp = StackNavigationProp<RootStackParamList, "home">


export default function master_login {
    const navigation = useNavigation<NavigationProp>();

   

const[email, setEmail] = useState('');
const[password, setPassword] = useState('');

const auth = getAuth();


const handleSignUp= (email:string, password:string) => { 
        createUserWithEmailAndPassword(auth, email, password)
        //.then(user => console.log('User signed up:', user))
        .then((userCredential:any) => {
            const user = userCredential.user
            console.log('User signed up:', user);
          })
        .catch((error:unknown) => {
            if (error instanceof Error) {
                console.error('Error signing up:', error.message)
            }
            else {
                console.error("Unknown error signing up:", error);
            }
            
        });
      }

const handleSignIn= (email:string, password:string) => { 
    signInWithEmailAndPassword(auth, email, password)
    //.then(user => console.log('User signed up:', user))
    .then((userCredential:any) => {
        const user = userCredential.user
        console.log('User signed in:', user);
      })
    .catch((error:unknown) => {
        if (error instanceof Error) {
            console.error('Error signing in:', error.message)
        }
        else {
            console.error("Unknown error signing in:", error);
        }
        
    });
      }
const handleNextPage = () => {
    navigation.navigate("home");
}


    return (


        <View
        style={{
          flex: 1,
          backgroundColor: "#641346", // Keep the same background color
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
         <TextInput
            placeholder="email"
            placeholderTextColor="black"
            value = {email}
            onChangeText={setEmail}
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              color: "black",
            }}
          />

<TextInput
            placeholder="password"
            placeholderTextColor="black"
            value = {password}
            onChangeText={setPassword}
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              color: "black",
            }}
          />



<Button label="SignUp" onPress={handleSignUp} />
<Button label="SignIn" onPress={handleSignUp} />







      </View>
    );
}