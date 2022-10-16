import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView>
      <View>
        <Image source={require("../../assets/login.png") } style={{width:350,height:250,alignSelf:"center"}}/>
      </View>
    </SafeAreaView>
  );
}
