import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import RoundedRectangle from "@/components/RoundedRectangle"; 
import { NextButton } from "@/components/nextButton";
import { useNavigation } from "@react-navigation/native"; 
import { StackNavigationProp } from "@react-navigation/stack";

const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

type RootStackParamList = {
  NewPost: undefined;
  newpost_create: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "newpost_create">;

export default function NewPostScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]); // Stores search results
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const authParams = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
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

    try {
      const trackParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      console.log("Searching for:", searchQuery); 

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=9`,
        trackParams
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (data.tracks?.items?.length > 0) {
        setResults(data.tracks.items.map((track: any) => ({
          id: track.id,
          title: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(", "),
        })));
        console.log("Formatted Results:", formattedResults); // ✅ Logs the formatted song list
        setResults(formattedResults);
      } else {
        console.log("No results found");
        setResults([]); // Clear results if no match
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSearchSubmit = () => {
    search();
    Keyboard.dismiss(); // Hide keyboard on submit
  };

  const SongGrid = () => {
    return (
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={3} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artist}</Text>
          </View>
        )}
        contentContainerStyle={styles.gridContent}
      />
    );
  };

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
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit} // Triggers search when pressing "Enter"
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearchSubmit}>
            <Ionicons name="mic" size={20} color="#7A5C61" />
          </TouchableOpacity>
        </View>

        {/* Song Grid */}
        <View style={styles.rectangle}>
          {results.length > 0 ? <SongGrid /> : <Text style={styles.noResultsText}>No results found</Text>}
        </View>

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <NextButton onPress={() => navigation.navigate("newpost_create")} />
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

