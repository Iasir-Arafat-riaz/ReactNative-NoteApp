import { View, Image, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../theme/typography";
import Text from "../../commonText/Text";
import { colors } from "../theme/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import { showMessage, hideMessage } from "react-native-flash-message";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function SignIn({ navigation }) {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [user,setUser]=useState(null);
  
  const signIn = () => {
    if(password.length<1 || email<1){
      return (showMessage({
        message: "Your email or password field empty",
        type: "warning"
      }))
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUser(user)
    console.log(user)
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    showMessage({
      message: `ERROR! ${"invalid email or password"}`,
      type: "danger",
    });
  });
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 18, flex: 1 }}>
      <View>
        <Image
          source={require("../../assets/login.png")}
          style={{ width: 350, height: 250, alignSelf: "center" }}
        />
        <Text style={styles.reminder} preset="h4">
          Never Forget your notes
        </Text>
        <View style={styles.inputDiv}>
          <Input placeholder={"Enter your email"}  onChange={(text)=>setEmail(text)} autoCapitalize={"none"}/>
          <Input placeholder={"Enter your password"} secureTextEntry  onChange={(text)=>setPassword(text)} />
        </View>
      </View>
      <View style={styles.lastContent}>
        <Button
          title="Login"
          customStyle={{
            backgroundColor: colors.orange,
            alignSelf: "center",
            marginVertical: 60,
          }}
          onPress={signIn}
        />
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text preset="h4">
            Don't have an account? {""}
            <Text preset="h4" style={{ color: colors.green }}>
              Signup
            </Text>
          </Text>
        </Pressable>
      </View>
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
  textInput: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    marginBottom: 20,
  },
});
