import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import Text from "../../commonText/Text";
import { colors } from "../theme/colors";

export default function RadioInput({ selected, option, key, onPress }) {
  const levelUpperCase = option
    .slice(0, 1)
    .toUpperCase()
    .concat(option.slice(1, option.length));
  return (
    <Pressable key={key} style={styles.radioContainer} onPress={onPress}>
      <View
        style={[styles.outerCircle, selected && styles.selectedOuterCircle]}
      >
        <View
          style={[styles.innerCircle, selected && styles.selectedInnerCircle]}
        />
      </View>
      <Text preset="regularBold" style={{ marginLeft: 10 }}>
        {levelUpperCase}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 14,
    height: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  selectedOuterCircle: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedInnerCircle: {
    width: 14,
    height: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.orange,
    backgroundColor: colors.orange,
  },
});
