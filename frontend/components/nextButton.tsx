import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// Next Button Component
interface NextButtonProps {
    onPress: () => void;
  }
  
  const NextButton: React.FC<NextButtonProps> = ({ onPress }) => {
    return (
      <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextButtonText}>next</Text>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    nextButton: {
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    nextButtonText: {
      fontSize: 20,
      fontFamily: 'Afacad',
      color: "#551A2D", // Dark purple
    },
  });

  export { NextButton };
  