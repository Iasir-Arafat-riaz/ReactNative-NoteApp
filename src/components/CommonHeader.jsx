import { Pressable, View } from "react-native";
import React from "react";
import Text from "../../commonText/Text";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../theme/spacing";
export default function CommonHeader({ title }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={28} color="#008B8B" />
      </Pressable>
      <Text preset="h3" style={{ marginLeft: spacing[3] }}>
        {title}
      </Text>
    </View>
  );
}
