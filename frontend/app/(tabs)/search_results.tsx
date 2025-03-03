import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import RoundedRectangle from "@/components/RoundedRectangle"; 
import { NextButton } from "@/components/nextButton";
import { useNavigation } from "@react-navigation/native"; 
import { StackNavigationProp } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";
import Config from "react-native-config";


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
  newpost_create: { songTitle: string; songArtist: string }; // ✅ Expect parameters
};


type NavigationProp = StackNavigationProp<RootStackParamList, "newpost_create">;

export default function NewPostScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
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

  const search = async () => {
    if (!searchQuery.trim() || !accessToken) return;

    setLoading(true); // Start loading indicator

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=9`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.tracks?.items?.length > 0) {
        setResults(
          data.tracks.items.map((track: any) => ({
            id: track.id,
            title: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(", "),
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

  const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string } | null>(null);

  const SongGrid = ({ setSelectedSong }: { setSelectedSong: (song: { title: string; artist: string }) => void }) => (
    //const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string } | null>(null);
    <FlatList
      // data={results}
      // keyExtractor={(item) => item.id}
      // numColumns={3}
      // renderItem={({ item }) => (
        
      //   <View style={styles.item}>
      //     <Text style={styles.songTitle}>{item.title}</Text>
      //     <Text style={styles.songArtist}>{item.artist}</Text>
      //   </View>
      // )}
      // contentContainerStyle={styles.gridContent}
      data={results}
    keyExtractor={(item) => item.id}
    numColumns={3}
    renderItem={({ item }) => (
      <TouchableOpacity
      //   style={styles.item}
        
      //   onPress={() =>
      //     setSelectedSong({ title: item.title, artist: item.artist });
      //     navigation.navigate("newpost_create", {
            
      //       songTitle: item.title,
      //       songArtist: item.artist,
      //     })
      //   }
      // >
      //   <Text style={styles.songTitle}>{item.title}</Text>
      //   <Text style={styles.songArtist}>{item.artist}</Text>
      style={styles.item}
        onPress={() => {
          setSelectedSong({ title: item.title, artist: item.artist }); // ✅ Set the selected song
          if (selectedSong) {
            navigation.navigate("newpost_create", {
              songTitle: item.title,
              songArtist: item.artist,
            });
          }
        }}
      >
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </TouchableOpacity>
    )}
    contentContainerStyle={styles.gridContent}
    />
  );

  return (
    <View style={styles.screenContainer}>
      <RoundedRectangle>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            // placeholder="find song..."
            // placeholderTextColor="black"
            // value={searchQuery}
            // onChangeText={setSearchQuery} //our 
            // onSubmitEditing={handleSearchSubmit}
            // style={styles.searchInput}
            placeholder="find song..."
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={(text) => {
              console.log("Search query updated:", text); // Debugging
              setSearchQuery(text);
            }}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search" // Makes keyboard show a "Search" button
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
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          {/* <NextButton onPress={() =>
          navigation.navigate("newpost_create", {
            songTitle: item.title,
            songArtist: item.artist,
          })
        } /> */}
        <NextButton
          onPress={() => {
            if (selectedSong) {
              navigation.navigate("newpost_create", {
                songTitle: selectedSong.title,
                songArtist: selectedSong.artist,
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
  },
  item: {
    alignItems: "center",
    margin: 5,
    marginBottom: 10,
    paddingTop: 80,
    backgroundColor: "#FFF",
    padding: 5,
    width: "30%",
    borderRadius: 10,
  },
  songTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 10,
    color: "gray",
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