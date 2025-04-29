import { useState } from "react";
import { View, TextInput, Text, Alert, StyleSheet } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import {Button } from "@/components/Button";
import auth from '@react-native-firebase/auth';
//import { sendData } from "../../api";

interface login_page {
    
}

export default function login_page () {

    const handleSignUp= (email, password) => { 
        
        auth().createUserWithEmailAndPassword(email, password)
        .then(user => console.log('User signed up:', user))
        .catch(error => console.error(error));
      }

      const handleSignIn= (email, password) => { 
        auth().signInWithEmailAndPassword(email, password)
        .then(user => console.log('User signed in:', user))
        .catch(error => console.error(error));
      
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
      
    
     
    

    <Button label="SignUp" onPress={handleSignUp} />
    <Button label="SignIn" onPress={handleSignUp} />

 

    

    </View>



    );
}

