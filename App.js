import Recipe from './Recipe';
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Recipe />
/>  {/* 👈 Call your RecipeBox component */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});