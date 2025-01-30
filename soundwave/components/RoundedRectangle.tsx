import { View, Text, StyleSheet } from 'react-native';

export default function RoundedRectangle() {
  return (
    <View style={styles.rectangle}>
      <Text style={styles.text}>new post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: '#D6A5B3',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
