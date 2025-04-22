import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// Record Component
interface RecordProps {
  albumCover?: string; // Album cover URL (from Spotify API)
}

const Record: React.FC<RecordProps> = ({ albumCover }) => {
  return (
    <View style={styles.recordContainer}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          {albumCover ? (
            <Image source={{ uri: albumCover }} style={styles.albumCover} />
          ) : (
            <Text style={styles.placeholderText}>?</Text>
          )}
        </View>
      </View>
    </View>
  );
};



// Styles
const styles = StyleSheet.create({
  recordContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  outerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "#D8A7B1", // Light pink
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  placeholderText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "darkred",
    fontFamily: 'Afacad',
  },
});

export { Record};
