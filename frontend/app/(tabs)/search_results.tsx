import { useState, useEffect } from "react";
import React from "react";
import { Image } from 'react-native';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import RoundedRectangle from "@/components/RoundedRectangle"; 
import { NextButton } from "@/components/nextButton";
import { useNavigation } from "@react-navigation/native"; 
import { StackNavigationProp } from "@react-navigation/stack";
<style>
@import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap');
</style>
import { useRoute } from "@react-navigation/native";
import Config from "react-native-config";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';



// const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
// const CLIENT_ID = Config.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = Config.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = "c6e0ff7427c64fba8dff3607aa63f7a6";
const CLIENT_SECRET = "92675ba7243f48119252ec8d36a25de7";

console.log("CLIENT_ID:", CLIENT_ID);
console.log("CLIENT_SECRET:", CLIENT_SECRET);


type RootStackParamList = {
  NewPost: undefined;
  newpost_create: { songTitle: string; songArtist: string, cover: string }; // ✅ Expect parameters
};

type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;
};



type NavigationProp = StackNavigationProp<RootStackParamList, "newpost_create">;

export default function NewPostScreen() {
  //what the user searched
  const [searchQuery, setSearchQuery] = useState("");
  //access tokens for api
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //results 
  const [results, setResults] = useState<any[]>([]);
  //loading state indicator
  const [loading, setLoading] = useState(false); // New loading state

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const authParams = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };

        const response = await fetch("https://accounts.spotify.com/api/token", authParams);
        const data = await response.json();

        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error("Failed to retrieve access token", data);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);


  useFocusEffect(
    useCallback(() => {
      // Reset everything when the page is opened
      setSearchQuery("");
      setResults([]);
      setSelectedSong(null);

      // Optionally re-fetch token if you want
      // fetchAccessToken();

      return () => {
        // Any cleanup (usually not needed here)
      };
    }, [])
  );

  const search = async () => {
    if (!searchQuery.trim() || !accessToken) return;

    setLoading(true); // Start loading indicator

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=21`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      //get data from api
      const data = await response.json();

      //if there is data from api
      if (data.tracks?.items?.length > 0) {
        //set results
        setResults(
          //map over all items from data.tracks.items
          data.tracks.items.map((track: any) => ({
            id: track.id,
            title: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(", "),
            cover: track.album.images?.[1]?.url || track.album.images?.[0]?.url || "",
          }))
        );
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleSearchSubmit = () => {
    console.log("searching alsdkfjasldkj");
    search();
    Keyboard.dismiss();
  };

  //const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string; cover:string } | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  
  


  //const SongGrid = ({ setSelectedSong }: { setSelectedSong: (song: { title: string; artist: string, cover:string }) => void }) => (
  //const SongGrid = ({ setSelectedSong }: { setSelectedSong: (song: Song) => void }) => (
    // type SongGridProps = {
    //   setSelectedSong: (song: Song) => void;
    // };
    
    const SongGrid = ({ setSelectedSong }: { setSelectedSong: (song: Song) => void }) => (

    <FlatList
      
    data={results}
    keyExtractor={(item) => item.id}
    numColumns={3}
    horizontal={false}
    columnWrapperStyle={{
      justifyContent: "space-between",
      paddingHorizontal: 6, 
    }}


    renderItem={({ item }) => (
      // <TouchableOpacity
      // style={styles.item}
      //   onPress={() => {
      //     setSelectedSong({ title: item.title, artist: item.artist, cover: item.cover }); 
      //   }}
      // >
      <View style={styles.item}>
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          setSelectedSong({
            id: item.id,
            title: item.title,
            artist: item.artist,
            cover: item.cover,
          })
        }
      >

        {/* <View style={styles.imagePlaceholder} /> */}
        <View style={styles.imagePlaceholder}>
          {item.cover ? (
            <Image
              source={{ uri: item.cover }}
              style={styles.coverImage}
              resizeMode="cover" // Ensures the image covers the entire placeholder
            />
          ) : null}
        </View>
        <Text style={styles.songTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
        <Text style={styles.songArtist} numberOfLines={2} ellipsizeMode="tail">{item.artist}</Text>
      </TouchableOpacity>
      </View>

      
    )}
    contentContainerStyle={styles.gridContent}
    />
  );

  useEffect(() => {
    if (selectedSong) {
      navigation.navigate("newpost_create", {
        songTitle: selectedSong.title,
        songArtist: selectedSong.artist,
        cover: selectedSong.cover,
      });
    }
  }, [selectedSong]);

  return (
    <View style={styles.screenContainer}>
      <RoundedRectangle>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            placeholder="find song..."
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search" 
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearchSubmit}>
            <Ionicons name="mic" size={20} color="#7A5C61" />
          </TouchableOpacity>
        </View>

        {/* Song Grid */}
        <View style={styles.rectangle}>
          {loading ? (
            <ActivityIndicator size="large" color="black" />
          ) : results.length > 0 ? (
            <SongGrid setSelectedSong={setSelectedSong} />

          ) : (
            <Text style={styles.noResultsText}>search for a song!</Text>
          )}
        </View>

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
        <NextButton
          onPress={() => {
            if (selectedSong) {
              navigation.navigate("newpost_create", {
                songTitle: selectedSong.title,
                songArtist: selectedSong.artist,
                cover: selectedSong.cover,
              });
            } else {
              alert("Please select a song first!"); // Prevents navigation if no song is selected
            }
          }}
        />
        </View>
      </RoundedRectangle>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#641346",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#AA7E8B",
    borderRadius: 20,
    paddingHorizontal: 15,
    width: "100%",
    height: 40,
    marginBottom: 15,
  },
  imagePlaceholder: {
    // width: '100%',
    // aspectRatio: 1, // Makes it a square, or change to a number like 1.5 for a rectangle
    // backgroundColor: '#ccc', // light gray placeholder
    // borderRadius: 8,
    // marginBottom: 8,
    // width: '80%', // Ensure placeholder takes full width of the grid item
    aspectRatio: 1, // Ensures the placeholder is square (you can adjust to create a rectangle if desired)
    // backgroundColor: '#ccc', // Light gray background color for empty state
    // borderRadius: 8, // Rounded corners for the placeholder
    marginBottom: 1, // Space between image and text
    // overflow: 'hidden', // Ensures the image doesn't overflow the rounded corners
    justifyContent: 'center', // Centers the image
    alignItems: 'center', // Centers the image
    height: 100, // Set a fixed height for the image container
    width: '80%',
    
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  rectangle: {
    backgroundColor: "#AA7E8B",
    borderRadius: 20,
    padding: 5,
    width: "100%",
    height: "70%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 20,
  },

  item: {
    alignItems: "center",
    margin: 5,
    marginBottom: 4,
    paddingTop: 0.2,
    backgroundColor: "#FFF",
    padding: 9,
    width: "30%",
    
    borderRadius: 10,
  },
  coverImage: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 8,
    // marginBottom: 10,
  },
  
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight:19,
    paddingHorizontal: 12,
    padding: 4,
    marginBottom: 4,
    fontFamily: "Afacad",
  },
  songArtist: {
    fontSize: 13,
    color: "gray",
    paddingHorizontal: 12,
    textAlign: "center",
    fontFamily: "Afacad",
    flexWrap: "wrap",

    overflow: "hidden",
    
  },
  noResultsText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  
  nextButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  
});