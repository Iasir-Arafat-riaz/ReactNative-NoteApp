import { View, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import Text from "../../commonText/Text";

export default function Home({user}) {
  // console.log(user.email);
  const logOut=()=>{
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // setUser({});
      })
      .catch((error) => {
        // An error happened.
      })
  }
  return (
    <SafeAreaView>
      <View>
        <Text style={{alignSelf:"center"}} preset="h2">Found {user.email}</Text>
        <Pressable onPress={logOut}><Text style={{alignSelf:"center"}}>logout</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}
