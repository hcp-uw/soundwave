import { useState, useEffect, useRef} from "react";
import { View, TextInput, Text, Alert, StyleSheet, Image, Animated } from "react-native";
import { Keyboard, TouchableWithoutFeedback, Easing} from 'react-native';

import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import { sendData } from "../api";
//import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
import { useRoute } from "@react-navigation/native";
//import {auth} from "@/firebaseConfig";
import { useAuth } from "../components/AuthContext";
<style>
@import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap');
</style>


// Spinning Image Component
const SpinningImage = ({ songCover }: { songCover: string }) => {
  //const [spinValue] = useState(new Animated.Value(0));
  const spinValue = useRef(new Animated.Value(0)).current; // Create an animated value for rotation

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,  // End value of the animation (1 full rotation)
        duration: 4000, // Time for one rotation (in milliseconds)
        useNativeDriver: true, // Enable native driver for better performance
        easing: Easing.linear, // make spinning consistent
      })
    ).start();
  }, [spinValue]);

  // Interpolating the spin value to a rotation degree
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Rotation range from 0 to 360 degrees
  });

  return (
    <View style={styles.record}>
      <Animated.Image
        source={{ uri: songCover }}
        style={[styles.album, { transform: [{ rotate: spin }] }]} // Apply the spinning animation
      />
    </View>
  );
};


export interface PostData {
    postId: string;
    song: string;
    artist: string;
    content: string;
    cover: string;
    album: string;
    uid: string | null| undefined;
  }

  

export default function NewPostScreen() {

  
  const route = useRoute();
  const { songTitle, songArtist, cover, album } = route.params as { songTitle: string; songArtist: string, cover:string, album:string };


  const [textBoxInput, setTextBoxInput] = useState(""); // Textbox state
  const songName = songTitle;
  const artistName = songArtist;
  const songCover = cover;
  const { currentUser } = useAuth();
  const uid = currentUser?.email;
  const songAlbum = album;
  

  const [idNum, setIdNum] = useState(0);

  

  const handleNext = async () => {
    console.log("test 1");
    const newId = idNum + 1;
    const postData: PostData = {
            postId: newId.toString(),
            song: songName,
            artist: artistName,
            content: textBoxInput,
            cover: songCover,
            album: songAlbum,
            uid: uid,
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
        setIdNum(newId);
        } else {
        Alert.alert("Error", "Failed to send data");
        }
    };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        <View style={styles.recordOuter}>
          <View style={styles.record}>
              <Image source={{ uri: songCover}} style={styles.album}></Image> 
              <SpinningImage songCover={songCover} />
          </View>
        </View>
        
        
        {/* Textbox */}
        <Text
          style={ styles.songTitle }
        >
          {`${songName} `}
        </Text>
        <Text style= {styles.artistName}>
          {`${artistName}`}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Spill your thoughts..."
          
          
          placeholderTextColor="gray"
          multiline={true}
          textAlignVertical="top"
          value={textBoxInput}
          onChangeText={setTextBoxInput}
        />

        
        {/* Next Button */}
        <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
          <NextButton onPress={handleNext} />
        </View>
      </RoundedRectangle>
    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  songTitle: { 
    paddingTop: 15,
    fontFamily: "Afacad",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  artistName: { 
    fontFamily: "Afacad",
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 10,
  },
  input: { 
    textAlign: "left",        // ← horizontal alignment
    textAlignVertical: "top",
    fontFamily: "Afacad", 
    fontSize: 16, 
    width: "100%",
    height: 200,
    paddingTop: 20,
    paddingHorizontal: 23,
    backgroundColor: "white",
    borderRadius: 20,
    
  }, 
  record: { 
    backgroundColor: "gray",
    paddingBottom: 20,
    width: 120,
    height: 120,
    borderRadius: 60, // half the width/height = circle
    overflow: "hidden", 
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    
  }, 
  recordOuter: { 
    backgroundColor: "black",
    paddingBottom: 20,
    width: 140,
    height: 140,
    borderRadius: 70, // half the width/height = circle
    overflow: "hidden", 
    justifyContent: "center",
    alignItems: "center",
  },
  album: { 
    width: 100,
    height: 100,
    borderRadius: 50, // half the width/height = circle
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  }

});
