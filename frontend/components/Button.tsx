import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export default function Button({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // button: {
  //   backgroundColor: "#4CAF50",
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  //   alignItems: "center",
  // },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
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
  ButtonText: {
    fontSize: 20,
    fontFamily: 'Afacad',
    color: "#551A2D", // Dark purple
  },

});
export { Button };