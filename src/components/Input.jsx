import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../theme/colors";

export default function Input({placeholder,secureTextEntry}) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    marginBottom: 20,
  },
});
