import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { Record } from "@/components/Record";
import { NextButton } from "@/components/nextButton";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  NewPost: undefined;
  newpost_create: undefined; // Change 'NextScreen' to your actual next screen name
};

type NavigationProp = StackNavigationProp<RootStackParamList, "newpost_create">;


export default function NewPostScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp>();


const handleNext= () => { 
  //console.log("hey viba");
  navigation.navigate("newpost_create");

}

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#641346",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
        paddingHorizontal: 20,
      }}
    >
      {/* Rounded Rectangle Container */}
      <RoundedRectangle>
      
        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#E5B8C9",
            borderRadius: 20,
            paddingHorizontal: 15,
            width: "100%",
            height: 40,
          }}
        >
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            placeholder="find song..."
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              color: "black",
            }}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={20} color="#7A5C61" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: "center", marginTop: 120}}>
            <Record/>
            
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: 15}}>
            <NextButton onPress={handleNext}/>
        </View>
        
      </RoundedRectangle>
    </View>
  );
}



