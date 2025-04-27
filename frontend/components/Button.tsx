import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

// Next Button Component
interface ButtonProps {
    onPress: () => void;
    label: string;
  }
  
  export default function Button({ label, onPress }: ButtonProps) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#4CAF50",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    label: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  export { Button };
  