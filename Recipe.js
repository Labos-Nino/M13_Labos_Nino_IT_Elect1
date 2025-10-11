import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeScreen({ navigation, recipes, setRecipes }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🍳 Recipe Box</Text>
      <Text style={styles.subHeader}>Welcome, DexterTenchavez!</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes by title or description..."
      />

      {recipes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No recipes yet</Text>
          <Text style={styles.emptySubtitle}>
            Start building your recipe collection by adding your first recipe!
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddRecipe")}
          >
            <Text style={styles.addButtonText}>+ Add Your First Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <Text style={styles.recipeDesc}>{item.description}</Text>
                <Text style={styles.recipeMeta}>
                  Prep: {item.prepTime} min | Cook: {item.cookTime} min | Serves:{" "}
                  {item.servings}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("AddRecipe")}
          >
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

function AddRecipeScreen({ navigation, recipes, setRecipes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addInstruction = () => setInstructions([...instructions, ""]);

  const handleSubmit = () => {
    if (!title.trim()) return alert("Please enter a recipe title.");

    const newRecipe = {
      id: Date.now(),
      title,
      description,
      prepTime,
      cookTime,
      servings,
      ingredients,
      instructions,
    };

    setRecipes([...recipes, newRecipe]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Add New Recipe</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter recipe title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Brief description of your recipe"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.timeRow}>
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="Prep Time (min)"
            keyboardType="numeric"
            value={prepTime}
            onChangeText={setPrepTime}
          />
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="Cook Time (min)"
            keyboardType="numeric"
            value={cookTime}
            onChangeText={setCookTime}
          />
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="Servings"
            keyboardType="numeric"
            value={servings}
            onChangeText={setServings}
          />
        </View>

        <Text style={styles.sectionHeader}>Ingredients</Text>
        {ingredients.map((ing, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Ingredient ${index + 1}`}
            value={ing}
            onChangeText={(text) => {
              const newList = [...ingredients];
              newList[index] = text;
              setIngredients(newList);
            }}
          />
        ))}
        <TouchableOpacity style={styles.addSmallBtn} onPress={addIngredient}>
          <Text style={styles.addSmallBtnText}>+ Add Ingredient</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Instructions</Text>
        {instructions.map((step, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Step ${index + 1}`}
            value={step}
            onChangeText={(text) => {
              const newSteps = [...instructions];
              newSteps[index] = text;
              setInstructions(newSteps);
            }}
          />
        ))}
        <TouchableOpacity style={styles.addSmallBtn} onPress={addInstruction}>
          <Text style={styles.addSmallBtnText}>+ Add Step</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function RecipeBoxApp() {
  const [recipes, setRecipes] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen {...props} recipes={recipes} setRecipes={setRecipes} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddRecipe" options={{ headerShown: false }}>
          {(props) => (
            <AddRecipeScreen
              {...props}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 6, color: "#ff7b54" },
  subHeader: { fontSize: 16, color: "#555", marginBottom: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyTitle: { fontSize: 20, fontWeight: "bold", color: "#444" },
  emptySubtitle: { color: "#777", textAlign: "center", marginVertical: 10 },
  addButton: {
    backgroundColor: "#ff7b54",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  recipeCard: {
    backgroundColor: "#fff8f5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffd1b3",
  },
  recipeTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  recipeDesc: { fontSize: 14, color: "#555", marginVertical: 5 },
  recipeMeta: { fontSize: 12, color: "#888" },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#ff7b54",
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeInput: {
    flex: 1,
    marginRight: 6,
  },
  sectionHeader: { fontWeight: "bold", fontSize: 16, marginVertical: 8 },
  addSmallBtn: {
    backgroundColor: "#ffe5d4",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addSmallBtnText: { color: "#ff7b54", fontWeight: "600" },
  submitBtn: {
    backgroundColor: "#ff7b54",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
  submitBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});