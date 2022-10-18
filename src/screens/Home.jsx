import { View, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import Text from "../../commonText/Text";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ user,navigation }) {
  // console.log(user.email);
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.logOutBtn} onPress={logOut}>
        <Text preset="small">{user.email}</Text>
        <Text style={styles.logOutTxt} preset="small">
          Logout
        </Text>
      </TouchableOpacity>
      <View style={styles.addNote}>
        <Text preset="h4">ADD NOTES</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Create")}>
          <Ionicons name="add-circle" size={34} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logOutBtn: {
    alignSelf: "flex-end",

    justifyContent:"center",
    alignItems:"center",
    margin: 10,
    fontSize: 10,
    
    color: "white",
    marginRight: 10,
    flexDirection: "row",
  },
  logOutTxt: {
    backgroundColor: colors.red,
    alignSelf:"center",
    padding:2,
    borderRadius: 5,
    marginLeft:5,
    color:"white"
  },
  addNote: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
