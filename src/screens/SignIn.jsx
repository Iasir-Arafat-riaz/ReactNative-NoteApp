import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../theme/typography";
import Text from "../../commonText/Text";

export default function SignIn() {
  return (
    <SafeAreaView>
      <View>
        <Image source={require("../../assets/login.png") } style={{width:350,height:250,alignSelf:"center"}}/>
        <Text style={styles.reminder} preset="h1" >only login page</Text>
        
        <Text></Text>
      </View>
    </SafeAreaView>
  );
}

const styles =StyleSheet.create({
  reminder:{
alignSelf:"center",
// fontSize:26
  }
})
