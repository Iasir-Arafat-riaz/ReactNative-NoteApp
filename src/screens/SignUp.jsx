import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../commonText/Text";
import Button from "../components/Button";
import { colors } from "../theme/colors";
import Input from "../components/Input";

export default function SignUp({ navigation }) {
  return (
    <SafeAreaView style={{ paddingHorizontal: 18, flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/signUp.png")}
            style={{
              alignSelf: "center"
            }}
    
          />
          <Text style={styles.reminder} preset="h4">
            Please Register Now
          </Text>
          <View style={styles.inputDiv}>
            <Input placeholder="Type your email" />
            <Input placeholder="Password" secureTextEntry />
            <Input placeholder="Type your Full N ame" />
            <Input placeholder="Type your Age" />
          </View>
        </View>
        <View style={styles.lastContent}>
          <Button
            title="Signup"
            customStyle={{
              backgroundColor: colors.orange,
              alignSelf: "center",
              marginVertical: 30,
            }}
          />
          <Pressable
            style={{ alignSelf: "center" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text preset="h4">
              Have an account? {""}
              <Text preset="h4" style={{ color: colors.green }}>
                Signin
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lastContent: {
    flex: 1,

    justifyContent: "center",
    alignItems: "flex-end",
    padding: 30,
  },
  reminder: {
    alignSelf: "center",
    margin: 20,
  },
});
