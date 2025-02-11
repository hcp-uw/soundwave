import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import RoundedRectangle from "@/components/RoundedRectangle"; // Ensure this exists
import { Record } from "@/components/Record";
import { NextButton } from "@/components/nextButton";


export default function NewPostScreen() {
  const [searchQuery, setSearchQuery] = useState("");

const handleNext= () => { 
  console.log("hey kanishka");
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
          <Ionicons name="search" size={20} color="#7A5C61" />
          <TextInput
            placeholder="find song..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 16,
              color: "#4A3B47",
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



