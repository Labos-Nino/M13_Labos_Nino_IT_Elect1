import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={{ alignItems: "center", margin: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Counter App</Text>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title ="Decrement" onPress={()=> setCount(count-1)} />
    </View>
  );
};

export default CounterApp;