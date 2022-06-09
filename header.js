// components for a header for the app
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    heaight: 80,
    paddingTop: 38,
    backgroundColor: "#cdacad",
  },
  title: {
    textAlign: "center",
    color: "",
    fontSize: 20,
    fontWeight: "bold",
  },
});
