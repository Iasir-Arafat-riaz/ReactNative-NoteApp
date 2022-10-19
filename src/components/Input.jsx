import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../theme/colors";

export default function Input({ placeholder, secureTextEntry, onChange,autoCapitalize,multiline ,defaultValue}) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChange}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      value={defaultValue}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    // height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    marginBottom: 18,
  },
});
