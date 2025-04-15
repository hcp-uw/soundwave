import { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import { sendData } from "../../api";
//import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
import { useRoute } from "@react-navigation/native";


interface PostData {
    postId: string;
    song: string;
    artist: string;
    content: string;
    
  }

export default function NewPostScreen() {
  const route = useRoute();
  const { songTitle, songArtist } = route.params as { songTitle: string; songArtist: string };

  const [textBoxInput, setTextBoxInput] = useState(""); // Textbox state
  const songName = songTitle;
  const artistName = songArtist;

  const [idNum, setIdNum] = useState(0);

  const handleNext = async () => {
    console.log("test 1");
    const postData: PostData = {
            //postId: idNum.toString(),
            postId: "696969696969",
            song: songName,
            artist: artistName,
            content: textBoxInput,
            
          };
        console.log("hiiiii");
        console.log(postData.postId);
        console.log(postData.song);
        console.log(postData.artist);
        console.log(postData.content);
        const response = await sendData(postData); // Use the function from api.js
        console.log("test2");
        if (response) {
        Alert.alert("slay", "post created!");
        setIdNum((prevId) => prevId + 1);
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
