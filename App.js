import React from "react";
import { KeyboardAvoidingView, Platform,Image,ScrollView } from "react-native";
import ChatScreen from "./BubbleChat";
import Comment from "./CommentSect";

export default function App() {
  return (
    
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    

      <BubbleChat/>
      <CommentSect/>
    </KeyboardAvoidingView>
  
  );
}