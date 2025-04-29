import { useState } from "react";
import { View, TextInput, Text, Alert, StyleSheet } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
//import { sendData } from "../../api";

interface loginData {
    username: string;
    password: string;
    email: string;
}

export default function signupEmail () {

    const handleNext= () => { 
        //??
      
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
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              color: "black",
            }}
          />
      

      
<TextInput
            placeholder="username"
            placeholderTextColor="black"
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
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              color: "black",
            }}
          />
 

    <View style={{ flex: 1, alignItems: "center", marginTop: 15}}>
            <NextButton onPress={handleNext}/>
        </View>

    </View>

    



    );
}

