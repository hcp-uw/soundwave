import { View, Text, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface RoundedRectangleProps {
  children?: ReactNode; // 👈 Ensures children can be any valid React element(s)
}

export default function RoundedRectangle({ children }: RoundedRectangleProps) {
  return (
    <View style={styles.rectangle}>
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
    //fontWeight: 'bold',
    color: 'black',
  },
});
