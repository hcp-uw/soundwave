import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { fetchData, sendData } from "../api"; 

const ExploreScreen = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await fetchData();
    setData(result);
  };

  const handleSend = async () => {
    const newData = { message: input };
    await sendData(newData);
    loadData(); // Refresh data after sending
  };

  return (
    <View>
      <Text>Data from Backend:</Text>
      <Text>{JSON.stringify(data)}</Text>
      <TextInput
        placeholder="Enter message"
        value={input}
        onChangeText={setInput}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <Button title="Send Data" onPress={handleSend} />
    </View>
  );
};

export default ExploreScreen;
