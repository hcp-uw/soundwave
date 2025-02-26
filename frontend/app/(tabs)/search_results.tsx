import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { NextButton } from "@/components/nextButton";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  NewPost: undefined;
  newpost_create: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "newpost_create">;

export default function NewPostScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    navigation.navigate("newpost_create");
  };

  const data = [
    { id: '1', title: 'cool song that eats', artist: 'Artist' },
    { id: '2', title: 'Song', artist: 'Artist' },
    { id: '3', title: 'Song', artist: 'Artist' },
    { id: '4', title: 'Song', artist: 'Artist' },
    { id: '5', title: 'Song', artist: 'Artist' },
    { id: '6', title: 'Song', artist: 'Artist' },
    { id: '7', title: 'Song', artist: 'Artist' },
    { id: '8', title: 'Song', artist: 'Artist' },
    { id: '9', title: 'Song', artist: 'Artist' },
  ];

  const SongGrid = () => {
    return (
      <FlatList
        data={data.slice(0, 9)}
        keyExtractor={(item) => item.id}
        numColumns={3} // 3 columns layout
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
      {/* Rounded Rectangle Container */}
      <RoundedRectangle>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            placeholder="find song..."
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={20} color="#7A5C61" />
          </TouchableOpacity>
        </View>

        {/* Song Grid */}
        <View style={styles.rectangle}>
          <SongGrid />
        </View>

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <NextButton onPress={handleNext} />
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
  recordContainer: {
    alignItems: "center",
    marginBottom: 15,
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
    //flex: 1,
    alignItems: "center",
    margin: 5,
    marginBottom:10,
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
  nextButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
