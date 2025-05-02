import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

interface RoundedRectangleProps {
  children?: ReactNode; // 👈 Ensures children can be any valid React element(s)
  style?: ViewStyle; // Add style prop to accept custom styles
}

export default function RoundedRectangle({ children, style }: RoundedRectangleProps) {
  return (
    <View style={[styles.rectangle, style]}> {/* Merge default styles with custom style */}
      <Text style={styles.text}>new post</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: '#D6A5B3',
    borderRadius: 20,
    padding: 15,
    paddingTop: 20,
    marginBottom: 40,
    width: '98%',
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontFamily: 'Afacad',
    paddingBottom: 15,
    color: 'black',
    fontWeight: 'semibold',
  },
});
