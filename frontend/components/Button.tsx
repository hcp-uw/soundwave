import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}

export default function CustomButton({ label, onPress }: CustomButtonProps) {
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
