import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NextButton } from "@/components/nextButton";

type RootStackParamList = {
    NewList: undefined;
    newlist_artists: undefined;
    newlist_songs: undefined;
  };
  
  type NavigationProp = StackNavigationProp<RootStackParamList, "NewList">;
  
  export default function NewListScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [selected, setSelected] = useState<"artists" | "songs" | null>(null);
  
    const handleSelection = (type: "artists" | "songs") => {
      setSelected(type);
    };
  
    const handleConfirm = () => {
      if (selected) {
        navigation.navigate(selected === "artists" ? "newlist_artists" : "newlist_songs");
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>choose list type...</Text>
  
        <TouchableOpacity
          style={[
            styles.button,
            selected === "artists" ? styles.buttonWhite : styles.buttonOpaque,
          ]}
          onPress={() => handleSelection("artists")}
        >
          <Text style={styles.buttonText}>artists</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[
            styles.button,
            selected === "songs" ? styles.buttonWhite : styles.buttonOpaque,
          ]}
          onPress={() => handleSelection("songs")}
        >
          <Text style={styles.buttonText}>songs</Text>
        </TouchableOpacity>
  
        {/* Next Button (instead of Confirm) */}
        <View style={styles.nextButtonContainer}>
          <NextButton onPress={handleConfirm} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e6a8b8",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontFamily: 'Afacad',
      color: "black",
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    buttonWhite: {
      backgroundColor: "white",
    },
    buttonOpaque: {
      backgroundColor: "#e6b6c6",
      opacity: 0.5,
    },
    buttonText: {
      fontSize: 20,
      fontFamily: 'Afacad',
      color: "#551A2D",
    },
    nextButtonContainer: {
      bottom: -200,
      opacity: 1, // Initially fully visible
    },
  });