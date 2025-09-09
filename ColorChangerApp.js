import React, { useState } from "react";
import { View, Button } from "react-native";

const ColorChangerApp = () => {
  const [color, setColor] = useState("skyblue");
  const colors = ["skyblue", "pink", "lightgreen", "yellow", "orange"];

  const changeColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    setColor(colors[random]);
  };

  return (
    <View
      style={{
        width: 200,
        height: 200,
        backgroundColor: color,
        margin: 20,
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
      <Button title="Change Color" onPress={changeColor} />
    </View>
  );
};

export default ColorChangerApp;