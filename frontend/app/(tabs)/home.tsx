import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <RoundedRectangle style={styles.headerContainer}>
        <View style={styles.albumArtContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.albumArt}
          />
        </View>
        <View>
          <Text style={styles.albumTitle}>Rise and Fall of a Midwest Princess</Text>
          <Text style={styles.artistName}>Chappell Roan</Text>
        </View>
      </RoundedRectangle>

      {/* Stacked Images Section */}
      <View style={styles.imageStackContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={styles.stackedImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={[styles.stackedImage, styles.stackedImageOffset]}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={[styles.stackedImage, styles.stackedImageOffset * 2]}
        />
      </View>

      {/* Song Title and Artist */}
      <Text style={styles.songTitle}>Red Wine Supernova</Text>
      <Text style={styles.songArtist}>Chappell Roan</Text>

      {/* Comment Section */}
      <RoundedRectangle style={styles.commentContainer}>
        <Text style={styles.commentText}>
          @username {"\n"}Sample comment text goes here. It can be multiline as well.
        </Text>
        <View style={styles.iconContainer}>
          <Ionicons name="star-outline" size={24} color="black" />
          <Ionicons name="play" size={24} color="black" style={{ marginLeft: 10 }} />
        </View>
      </RoundedRectangle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#641346",
    alignItems: "center",
    padding: 1000,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#E5B8C9",
    padding: 10,
    marginTop: 60,
    width: "90%",
    alignItems: "center",
  },
  albumArtContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  albumArt: {
    width: "100%",
    height: "100%",
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  artistName: {
    fontSize: 14,
    color: "black",
  },
  imageStackContainer: {
    marginTop: 20,
    position: "relative",
    width: "90%",
    height: 250,
    alignItems: "center",
  },
  stackedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
  },
  stackedImageOffset: {
    left: 10,
    top: 10,
    zIndex: 0,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  songArtist: {
    fontSize: 18,
    color: "#BFBFBF",
  },
  commentContainer: {
    backgroundColor: "#E5B8C9",
    padding: 15,
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentText: {
    color: "black",
    fontSize: 14,
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
