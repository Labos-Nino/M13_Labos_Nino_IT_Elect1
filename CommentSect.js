import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";

export default function CommentSect() {
  const [comments, setComments] = useState([
    { id: "1", text: "Maayong gabie", avatar: require("./assets/picture.jpg") },
    { id: "2", text: "Kung ako nalang diay?", avatar: require("./assets/picture.jpg") },

  ]);
  const [newComment, setNewComment] = useState("");
  const flatListRef = useRef(null);

  const addComment = () => {
    if (newComment.trim().length === 0) return;
    const newEntry = {
      id: Date.now().toString(),
      text: newComment,
      avatar: require("./assets/picture.jpg"),
    };
    setComments((prev) => [...prev, newEntry]);
    setNewComment("");

    // Scroll to the bottom
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentBox}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.commentText}>{item.text}</Text>
        <TouchableOpacity style={styles.replyBtn}>
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            />

            {/* Input section pinned at bottom */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
                blurOnSubmit={true}
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.sendBtn} onPress={addComment}>
                <Text style={styles.sendText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  commentText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  replyBtn: { marginTop: 4 },
  replyText: { color: "#007bff", fontWeight: "500" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#007bff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});