import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import React, { useState } from "react";

export default function Adduser({ submitHandler }) {
  const [name, setText] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const saveName = (val) => {
    setText(val);
  };

  const saveAddress = (val) => {
    setAddress(val);
  };

  const saveEmail = (val) => {
    setEmail(val);
  };

  return (
    <View>
      <TextInput
        style={StyleSheet.input}
        placeholder="Enter your name"
        onChangeText={saveName}
      />
      <TextInput
        style={StyleSheet.input}
        placeholder="Enter your address"
        onChangeText={saveAddress}
      />
      <TextInput
        style={StyleSheet.input}
        placeholder="Enter your email"
        onChangeText={saveEmail}
      />

      <Button
        title="Add User"
        color="green"
        onPress={() => submitHandler(name, address, email)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#adadad",
  },
});
