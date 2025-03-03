import { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import { sendData } from "../../api";
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";

interface PostData {
    postId: string;
    song: string;
    artist: string;
    content: string;
    
  }

export default function NewPostScreen() {
  const [textBoxInput, setTextBoxInput] = useState(""); // Textbox state
  const songName = "very cool song"
  const artistName = "very cool artist"

  const handleNext = async () => {
    const postData: PostData = {
            postId: "1234",
            song: songName,
            artist: artistName,
            content: textBoxInput,
            
          };
        const response = await sendData(postData); // Use the function from api.js
        if (response) {
        Alert.alert("slay", "post created!");
        } else {
        Alert.alert("Error", "Failed to send data");
        }
    };
  
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
      {/* Rounded Rectangle Container */}
      <RoundedRectangle>
        {/* Textbox */}
        <Text
          style={{
            marginTop: 10, 
            fontSize: 16,
            color: "black",
            textAlign: "center",
            marginBottom: 20
          }}
        >
          {`${songName} \n ${artistName}`}
        </Text>
        <TextInput
          style={{
            width: "100%",
            height: 400,
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
          placeholder="Enter text..."
          placeholderTextColor="gray"
          value={textBoxInput}
          onChangeText={setTextBoxInput}
        />

        
        {/* Next Button */}
        <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
          <NextButton onPress={handleNext} />
        </View>
      </RoundedRectangle>
    </View>
  );
}
