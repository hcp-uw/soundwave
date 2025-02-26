import { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import { sendData } from "../../api";
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";


//K: import necessary client ID and secret from .env
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

//K: fetches our access token (spotify api thing)
useEffect(() => {
  let authParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret,
  };

  fetch("https://accounts.spotify.com/api/token", authParams) //we are sending our POST request to this url
    .then((result) => result.json())
    .then((data) => {
      setAccessToken(data.access_token);
    });
}, []);


//gets the first result of type 'track', based on search
async function search() {
  let trackParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  // Get Track
  const trackID = await fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
    trackParams
  )
    .then((result) => result.json())
    .then((data) => {
      return data.artists.items[0].id;
    });
}


//what's left? actually integrate in a "search" function into the front end
//github stuff


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
